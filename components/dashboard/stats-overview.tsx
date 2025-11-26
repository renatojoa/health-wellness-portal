"use client"

import { motion } from "framer-motion"
import type { User } from "@/lib/mock-users"
import { Activity, Flame, Award, TrendingUp } from "lucide-react"

interface StatsOverviewProps {
  user: User
}

export default function StatsOverview({ user }: StatsOverviewProps) {
  const stats = [
    {
      icon: Activity,
      label: "Workouts",
      value: user.workoutsCompleted,
      color: "emerald",
      suffix: "sessions",
    },
    {
      icon: Flame,
      label: "Streak",
      value: user.streakDays,
      color: "orange",
      suffix: "days",
    },
    {
      icon: TrendingUp,
      label: "Distance",
      value: user.totalDistance,
      color: "blue",
      suffix: "km",
    },
    {
      icon: Award,
      label: "Badges",
      value: user.badges.length,
      color: "purple",
      suffix: "earned",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const colorMap = {
          emerald: "from-emerald-500 to-teal-500",
          orange: "from-orange-500 to-red-500",
          blue: "from-blue-500 to-cyan-500",
          purple: "from-purple-500 to-pink-500",
        }

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.suffix}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
