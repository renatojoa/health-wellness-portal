"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/lib/mock-users"
import { Check, Zap } from "lucide-react"

interface ActivityChecklistProps {
  user: User
  onPointsEarned: (points: number) => void
}

interface Activity {
  id: string
  name: string
  description: string
  points: number
  completed: boolean
  category: "workout" | "nutrition" | "mindfulness" | "social"
}

export default function ActivityChecklist({ user, onPointsEarned }: ActivityChecklistProps) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      name: "Morning Run",
      description: "30 minutes cardio",
      points: 150,
      completed: false,
      category: "workout",
    },
    {
      id: "2",
      name: "Healthy Breakfast",
      description: "Balanced meal",
      points: 50,
      completed: false,
      category: "nutrition",
    },
    {
      id: "3",
      name: "Yoga Session",
      description: "20 minutes mindfulness",
      points: 100,
      completed: false,
      category: "mindfulness",
    },
    {
      id: "4",
      name: "Gym Weights",
      description: "45 minutes strength",
      points: 200,
      completed: false,
      category: "workout",
    },
    {
      id: "5",
      name: "Healthy Lunch",
      description: "Protein & vegetables",
      points: 50,
      completed: false,
      category: "nutrition",
    },
    {
      id: "6",
      name: "Invite Friend",
      description: "Share wellness journey",
      points: 75,
      completed: false,
      category: "social",
    },
  ])

  const [celebratingId, setCelebratingId] = useState<string | null>(null)

  const handleActivityComplete = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) => {
        if (activity.id === id && !activity.completed) {
          setCelebratingId(id)
          onPointsEarned(activity.points)
          setTimeout(() => setCelebratingId(null), 1000)
          return { ...activity, completed: true }
        }
        return activity
      }),
    )
  }

  const categoryColors = {
    workout: "from-emerald-100 to-teal-100",
    nutrition: "from-orange-100 to-yellow-100",
    mindfulness: "from-purple-100 to-pink-100",
    social: "from-blue-100 to-cyan-100",
  }

  const categoryIcons = {
    workout: "💪",
    nutrition: "🥗",
    mindfulness: "🧘",
    social: "👥",
  }

  const totalPoints = activities.filter((a) => a.completed).reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Today's Activities</h3>
        <p className="text-gray-600 text-sm mb-4">Complete activities to earn points and climb the ranks</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative group bg-gradient-to-br ${categoryColors[activity.category]} rounded-xl p-4 cursor-pointer overflow-hidden transition`}
                onClick={() => handleActivityComplete(activity.id)}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition rounded-xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryIcons[activity.category]}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{activity.name}</h4>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                      </div>
                    </div>

                    <motion.div
                      animate={activity.completed ? { scale: 1 } : { scale: 0.8 }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        activity.completed
                          ? "bg-emerald-500 border-emerald-600"
                          : "border-gray-400 group-hover:border-emerald-500"
                      }`}
                    >
                      {activity.completed && <Check className="w-4 h-4 text-white" />}
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${activity.completed ? "text-emerald-600" : "text-gray-700"}`}>
                      {activity.points} pts
                    </span>
                    {activity.completed && <span className="text-xs text-emerald-600 font-bold">✓ Completed</span>}
                  </div>
                </div>

                <AnimatePresence>
                  {celebratingId === activity.id && (
                    <>
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-emerald-500 rounded-xl"
                      />
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i / 8) * Math.PI * 2) * 60,
                            y: Math.sin((i / 8) * Math.PI * 2) * 60,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 0.8 }}
                          className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full pointer-events-none"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Today's Earned Points:</span>
            <motion.div
              key={totalPoints}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
            >
              <Zap className="w-6 h-6" />
              {totalPoints}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
