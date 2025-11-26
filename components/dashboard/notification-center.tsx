"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle, TrendingUp, Zap, Lightbulb, Plus, Minus } from "lucide-react"
import { useState } from "react"

interface NotificationCenterProps {
  onClose: () => void
}

interface Notification {
  id: string
  type: "rank-up" | "plan-change" | "achievement" | "recommendation"
  title: string
  message: string
  icon: any
  color: string
  action?: {
    label: string
    description: string
    impact: "add" | "reduce"
  }
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "rank-up",
      title: "Rank Increased!",
      message: "Congratulations! You have reached Gold Rank",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "2",
      type: "plan-change",
      title: "Plan Recommendation",
      message:
        "Based on your recent progress and 15-day streak, we recommend adding 2 more cardio sessions per week to boost your endurance",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500",
      action: {
        label: "Add Cardio Sessions",
        description: "+ 2 sessions/week",
        impact: "add",
      },
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You completed 7-day streak! Keep up the great work",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "4",
      type: "plan-change",
      title: "Plan Adjustment Suggestion",
      message:
        "You seem to be overtraining with 5 gym sessions this week. Consider reducing to 4 sessions and add a rest day",
      icon: AlertCircle,
      color: "from-orange-500 to-red-500",
      action: {
        label: "Reduce Training",
        description: "- 1 session/week",
        impact: "reduce",
      },
    },
  ])

  const [acceptedActions, setAcceptedActions] = useState<string[]>([])

  const handleAction = (notificationId: string) => {
    setAcceptedActions((prev) => [...prev, notificationId])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-16 right-4 w-96 max-h-96 bg-white rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
    >
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h3 className="text-white font-bold">Notifications</h3>
        <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded-lg transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              const Icon = notification.icon
              const isAccepted = acceptedActions.includes(notification.id)

              return (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${notification.color} h-fit flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{notification.message}</p>

                      {notification.action && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 0.1 }}
                          className="mt-3 pt-3 border-t border-gray-200"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAction(notification.id)}
                            disabled={isAccepted}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold text-xs transition ${
                              isAccepted
                                ? "bg-emerald-100 text-emerald-700 cursor-default"
                                : notification.action.impact === "add"
                                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                  : "bg-orange-500 hover:bg-orange-600 text-white"
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              {notification.action.impact === "add" ? (
                                <Plus className="w-3 h-3" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                              {isAccepted ? "✓ Accepted" : "Accept Change"}
                            </span>
                            <span className="text-xs opacity-80">{notification.action.description}</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-40"
            >
              <p className="text-gray-500 text-sm">No notifications</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
