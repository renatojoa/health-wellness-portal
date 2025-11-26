"use client"

import { useEffect, useState } from "react"
import LoginForm from "@/components/auth/login-form"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  if (!isClient) return null

  if (!currentUser) {
    return <LoginForm onLoginSuccess={(user) => setCurrentUser(user)} />
  }

  return <DashboardLayout user={currentUser} onLogout={() => setCurrentUser(null)} />
}
