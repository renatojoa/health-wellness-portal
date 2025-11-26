"use client"

import { motion } from "framer-motion"
import { X, TrendingUp } from "lucide-react"

interface PushNotificationBannerProps {
  notification: {
    type: string
    title: string
    message: string
  }
  onClose: () => void
}

export default function PushNotificationBanner({ notification, onClose }: PushNotificationBannerProps) {
  const getIconColor = (type: string) => {
    switch (type) {
      case "rank-progress":
        return "from-yellow-500 to-orange-500"
      case "achievement":
        return "from-purple-500 to-pink-500"
      case "friend-request":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-emerald-500 to-teal-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
    >
      <motion.div
        className={`bg-gradient-to-r ${getIconColor(notification.type)} rounded-xl shadow-2xl px-6 py-4 max-w-md text-white overflow-hidden`}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="relative z-10 flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <TrendingUp className="w-6 h-6 flex-shrink-0 mt-0.5" />
          </motion.div>

          <div className="flex-1">
            <h3 className="font-bold text-lg">{notification.title}</h3>
            <p className="text-white/90 text-sm mt-1">{notification.message}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Auto-close progress bar */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 4, ease: "linear" }}
          onAnimationComplete={onClose}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 origin-left"
        />
      </motion.div>
    </motion.div>
  )
}
