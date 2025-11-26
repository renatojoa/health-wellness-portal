"use client"

import { motion } from "framer-motion"
import { type User, users } from "@/lib/mock-users"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardProps {
  currentUser: User
}

export default function Leaderboard({ currentUser }: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)

  const rankMedals = {
    0: { icon: Trophy, color: "from-yellow-400 to-orange-500", text: "gold" },
    1: { icon: Medal, color: "from-gray-300 to-gray-400", text: "silver" },
    2: { icon: Award, color: "from-orange-400 to-orange-600", text: "bronze" },
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Global Leaderboard</h1>
        <p className="text-gray-600">See how you stack up against other wellness warriors</p>
      </motion.div>

      <div className="grid gap-4">
        {sortedUsers.map((user, index) => {
          const isCurrentUser = user.id === currentUser.id
          const medalInfo = rankMedals[Math.min(index, 2) as keyof typeof rankMedals]
          const MedalIcon = medalInfo.icon

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              className={`relative group rounded-xl shadow-lg overflow-hidden cursor-pointer transition ${
                isCurrentUser
                  ? "ring-2 ring-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50"
                  : "bg-white hover:shadow-xl"
              }`}
            >
              <div className="p-6 flex items-center gap-4">
                {/* Position Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${medalInfo.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <MedalIcon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-200">
                    {index + 1}
                  </span>
                </motion.div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{user.name}</h3>
                    {isCurrentUser && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full whitespace-nowrap">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full font-bold text-white bg-gradient-to-r ${
                        user.rank === "Bronze"
                          ? "from-orange-400 to-orange-600"
                          : user.rank === "Silver"
                            ? "from-gray-300 to-gray-500"
                            : user.rank === "Gold"
                              ? "from-yellow-300 to-yellow-600"
                              : "from-blue-300 to-blue-600"
                      }`}
                    >
                      {user.rank}
                    </span>
                    <span className="text-gray-600">{user.workoutsCompleted} workouts</span>
                  </div>
                </div>

                {/* Points */}
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-right flex-shrink-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {user.points.toLocaleString()}
                  </div>
                  <span className="text-xs text-gray-500">points</span>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.points / sortedUsers[0].points) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
