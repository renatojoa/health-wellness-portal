"use client"

import { motion } from "framer-motion"
import type { User } from "@/lib/mock-users"
import { Zap } from "lucide-react"

interface ProfileCardProps {
  user: User
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const rankColors = {
    Bronze: "from-orange-400 to-orange-600",
    Silver: "from-gray-300 to-gray-500",
    Gold: "from-yellow-300 to-yellow-600",
    Platinum: "from-blue-300 to-blue-600",
  }

  const nextRankPoints = {
    Bronze: 2000,
    Silver: 3500,
    Gold: 5000,
    Platinum: 10000,
  }

  const currentPoints = user.points
  const targetPoints = nextRankPoints[user.rank]
  const progressPercent = (currentPoints / targetPoints) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl shadow-xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${rankColors[user.rank]} opacity-10`} />

      <div className="relative p-8 bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative w-24 h-24"
            >
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${rankColors[user.rank]} opacity-20 animate-pulse`}
              />
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${rankColors[user.rank]} text-white font-bold text-sm`}
              >
                {user.rank} Rank
              </motion.div>
              <p className="text-gray-600 text-sm mt-2 flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                {user.points.toLocaleString()} Points
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 md:flex-none w-full md:w-80"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700">
                  Progress to {user.rank === "Platinum" ? "Elite" : "Next Rank"}
                </span>
                <span className="text-emerald-600 font-bold">
                  {currentPoints.toLocaleString()} / {targetPoints.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
