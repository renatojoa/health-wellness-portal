"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/lib/mock-users"
import Navigation from "@/components/dashboard/navigation"
import ProfileCard from "@/components/dashboard/profile-card"
import StatsOverview from "@/components/dashboard/stats-overview"
import ActivityChecklist from "@/components/dashboard/activity-checklist"
import NotificationCenter from "@/components/dashboard/notification-center"
import { Bell, LogOut } from "lucide-react"
import Leaderboard from "@/components/pages/leaderboard"
import FriendsPage from "@/components/pages/friends-page"
import OffersPage from "@/components/pages/offers-page"
import PlacesPage from "@/components/pages/places-page"
import PushNotificationBanner from "@/components/dashboard/push-notification-banner"
import EditableSuggestionsManager from "@/components/dashboard/editable-suggestions-manager"

interface DashboardLayoutProps {
  user: User
  onLogout: () => void
}

export default function DashboardLayout({ user: initialUser, onLogout }: DashboardLayoutProps) {
  const [currentUser, setCurrentUser] = useState(initialUser)
  const [showNotification, setShowNotification] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [pushNotification, setPushNotification] = useState<{
    type: string
    title: string
    message: string
    visible: boolean
  } | null>(null)
  const [showSuggestionsManager, setShowSuggestionsManager] = useState(false)

  useEffect(() => {
    // Simulate push notifications
    const timer = setTimeout(() => {
      setPushNotification({
        type: "rank-progress",
        title: "You are 150 points away from Platinum",
        message: "Complete 3 more activities today to reach the next rank!",
        visible: true,
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    onLogout()
  }

  const updateUserPoints = (points: number) => {
    const updated = { ...currentUser, points: currentUser.points + points }
    setCurrentUser(updated)
    localStorage.setItem("currentUser", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button
          onClick={() => setShowNotification(!showNotification)}
          className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition"
        >
          <Bell className="w-5 h-5 text-emerald-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={() => setShowSuggestionsManager(!showSuggestionsManager)}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition"
          title="Edit Suggestions"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={handleLogout}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {showNotification && <NotificationCenter onClose={() => setShowNotification(false)} />}

      {showSuggestionsManager && <EditableSuggestionsManager onClose={() => setShowSuggestionsManager(false)} />}

      <AnimatePresence>
        {pushNotification?.visible && (
          <PushNotificationBanner notification={pushNotification} onClose={() => setPushNotification(null)} />
        )}
      </AnimatePresence>

      <main className="pt-20 pb-8 px-4 md:px-8">
        {currentPage === "home" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-6xl mx-auto"
          >
            <ProfileCard user={currentUser} />
            <StatsOverview user={currentUser} />
            <ActivityChecklist user={currentUser} onPointsEarned={updateUserPoints} />
          </motion.div>
        )}

        {currentPage === "leaderboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <Leaderboard currentUser={currentUser} />
          </motion.div>
        )}

        {currentPage === "friends" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <FriendsPage currentUser={currentUser} />
          </motion.div>
        )}

        {currentPage === "offers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
            <OffersPage />
          </motion.div>
        )}

        {currentPage === "places" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
            <PlacesPage />
          </motion.div>
        )}
      </main>
    </div>
  )
}
