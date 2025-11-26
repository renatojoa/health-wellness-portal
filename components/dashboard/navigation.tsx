"use client"

import { motion } from "framer-motion"
import { Home, Trophy, Gift, MapPin, Users } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "friends", label: "Friends", icon: Users },
    { id: "offers", label: "Offers", icon: Gift },
    { id: "places", label: "Places", icon: MapPin },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            WellFlow
          </motion.h1>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition flex items-center gap-2 ${
                    currentPage === item.id ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
