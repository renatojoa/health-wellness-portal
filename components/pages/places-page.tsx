"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Star, Users } from "lucide-react"

interface Place {
  id: string
  name: string
  type: "hiking" | "park" | "beach" | "trail"
  rating: number
  reviews: number
  distance: number
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  image: string
  visitorsToday: number
}

export default function PlacesPage() {
  const [visited, setVisited] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Easy" | "Medium" | "Hard">("all")

  const places: Place[] = [
    {
      id: "1",
      name: "Sunrise Peak Trail",
      type: "trail",
      rating: 4.8,
      reviews: 234,
      distance: 5.2,
      difficulty: "Medium",
      description: "Beautiful mountain trail with stunning sunrise views and perfect for morning runs",
      image: "/mountain-trail-sunrise.jpg",
      visitorsToday: 45,
    },
    {
      id: "2",
      name: "Coastal Beach Run",
      type: "beach",
      rating: 4.6,
      reviews: 187,
      distance: 8.0,
      difficulty: "Easy",
      description: "Flat sandy beach perfect for leisurely jogs and refreshing sea air",
      image: "/beach-running-path.jpg",
      visitorsToday: 62,
    },
    {
      id: "3",
      name: "Forest Adventure Loop",
      type: "hiking",
      rating: 4.9,
      reviews: 312,
      distance: 7.5,
      difficulty: "Medium",
      description: "Dense forest with scenic viewpoints and diverse wildlife watching opportunities",
      image: "/forest-hiking-trail.jpg",
      visitorsToday: 38,
    },
    {
      id: "4",
      name: "Downtown Green Park",
      type: "park",
      rating: 4.4,
      reviews: 156,
      distance: 1.2,
      difficulty: "Easy",
      description: "Central park with walking paths, sports courts, and fitness equipment",
      image: "/urban-park-green-space.jpg",
      visitorsToday: 125,
    },
    {
      id: "5",
      name: "Mountain Summit Challenge",
      type: "hiking",
      rating: 4.7,
      reviews: 198,
      distance: 12.0,
      difficulty: "Hard",
      description: "Challenging mountain hike with incredible panoramic views at the top",
      image: "/mountain-summit-peak.jpg",
      visitorsToday: 22,
    },
    {
      id: "6",
      name: "Riverside Bike Path",
      type: "trail",
      rating: 4.5,
      reviews: 203,
      distance: 10.3,
      difficulty: "Easy",
      description: "Scenic riverside cycling and running path with multiple rest areas",
      image: "/riverside-bike-path.jpg",
      visitorsToday: 87,
    },
  ]

  const filteredPlaces =
    selectedDifficulty === "all" ? places : places.filter((p) => p.difficulty === selectedDifficulty)

  const toggleVisited = (placeId: string) => {
    setVisited((prev) => (prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]))
  }

  const typeColors = {
    hiking: { color: "from-green-500 to-emerald-500", icon: "🥾" },
    park: { color: "from-lime-500 to-green-500", icon: "🌳" },
    beach: { color: "from-blue-500 to-cyan-500", icon: "🏖️" },
    trail: { color: "from-orange-500 to-red-500", icon: "🛤️" },
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Places to Visit</h1>
        <p className="text-gray-600">Discover amazing outdoor locations for your workouts</p>
      </motion.div>

      {/* Difficulty Filter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 overflow-x-auto pb-2">
        {["all", "Easy", "Medium", "Hard"].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty as any)}
            className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition ${
              selectedDifficulty === difficulty
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:border-emerald-500"
            }`}
          >
            {difficulty === "all" ? "All Places" : `${difficulty}`}
          </button>
        ))}
      </motion.div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlaces.map((place, index) => {
          const colors = typeColors[place.type]
          const isVisited = visited.includes(place.id)

          return (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${colors.color} opacity-0 group-hover:opacity-10 transition`}
                />

                {/* Type Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${colors.color} text-white text-sm font-bold rounded-full`}
                >
                  {colors.icon} {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                </div>

                {/* Visited Badge */}
                {isVisited && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    ✓ Visited
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                  <span className={`px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full`}>
                    {place.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{place.rating}</span>
                    <span className="text-gray-400">({place.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {place.visitorsToday}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {place.distance} km away
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleVisited(place.id)}
                  className={`w-full font-bold py-2 rounded-lg transition ${
                    isVisited
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-emerald-50 border-2 border-gray-200"
                  }`}
                >
                  {isVisited ? "✓ Mark as Visited" : "Mark as Visited"}
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
