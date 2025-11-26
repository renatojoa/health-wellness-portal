"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import type { User } from "@/lib/mock-users"

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(JSON.parse(user))
  }, [router])

  if (!currentUser) return null

  return <DashboardLayout user={currentUser} />
}
