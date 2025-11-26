export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar: string
  points: number
  rank: "Bronze" | "Silver" | "Gold" | "Platinum"
  totalDistance: number
  workoutsCompleted: number
  streakDays: number
  badges: string[]
}

export const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    avatar: "/woman-with-fitness-gear.jpg",
    points: 2450,
    rank: "Gold",
    totalDistance: 125.5,
    workoutsCompleted: 42,
    streakDays: 15,
    badges: ["First Step", "Week Warrior", "Month Master", "Consistency Pro"],
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    password: "password123",
    avatar: "/man-running-outdoor.jpg",
    points: 3120,
    rank: "Platinum",
    totalDistance: 215.8,
    workoutsCompleted: 68,
    streakDays: 32,
    badges: ["First Step", "Week Warrior", "Month Master", "Consistency Pro", "Elite Runner"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    password: "password123",
    avatar: "/woman-yoga.png",
    points: 1850,
    rank: "Silver",
    totalDistance: 87.3,
    workoutsCompleted: 28,
    streakDays: 8,
    badges: ["First Step", "Week Warrior"],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    password: "password123",
    avatar: "/man-at-gym-lifting-weights.jpg",
    points: 1250,
    rank: "Bronze",
    totalDistance: 45.2,
    workoutsCompleted: 15,
    streakDays: 3,
    badges: ["First Step"],
  },
  {
    id: "5",
    name: "Jessica Lee",
    email: "jessica@example.com",
    password: "password123",
    avatar: "/woman-cycling-outdoors.jpg",
    points: 2890,
    rank: "Gold",
    totalDistance: 156.4,
    workoutsCompleted: 54,
    streakDays: 22,
    badges: ["First Step", "Week Warrior", "Month Master", "Cycle Enthusiast"],
  },
]
