"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type User, users } from "@/lib/mock-users"
import { Search, UserPlus, TrendingUp } from "lucide-react"

interface FriendsPageProps {
  currentUser: User
}

interface Friend extends User {
  isFriend: boolean
}

export default function FriendsPage({ currentUser }: FriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState<string[]>([])

  const otherUsers = useMemo(
    () => users.filter((u) => u.id !== currentUser.id).map((u) => ({ ...u, isFriend: friends.includes(u.id) })),
    [currentUser.id, friends],
  )

  const filteredUsers = useMemo(
    () =>
      otherUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [otherUsers, searchQuery],
  )

  const addFriend = (userId: string) => {
    if (!friends.includes(userId)) {
      setFriends((prev) => [...prev, userId])
    }
  }

  const removeFriend = (userId: string) => {
    setFriends((prev) => prev.filter((id) => id !== userId))
  }

  const myFriends = otherUsers.filter((u) => friends.includes(u.id))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Friends</h1>
        <p className="text-gray-600">Connect with wellness enthusiasts and compete together</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
      </motion.div>

      {/* My Friends Section */}
      {myFriends.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Friends ({myFriends.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myFriends.map((friend) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{friend.name}</h4>
                      <p className="text-xs text-emerald-600 font-bold">{friend.rank}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{friend.points} points</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <TrendingUp className="w-4 h-4" />
                    {friend.streakDays}d
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Discover Friends Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Discover Friends {filteredUsers.length > 0 && `(${filteredUsers.length})`}
        </h2>

        <AnimatePresence mode="popLayout">
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{user.name}</h4>
                        <p className="text-xs text-blue-600 font-bold">{user.rank}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{user.points} points</span>
                    <span className="text-xs text-gray-500">{user.workoutsCompleted} workouts</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addFriend(user.id)}
                      disabled={user.isFriend}
                      className={`flex-1 py-2 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
                        user.isFriend
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      {user.isFriend ? "Added" : "Add Friend"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-500">No users found matching your search</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
