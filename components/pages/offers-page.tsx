"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Heart } from "lucide-react"

interface Offer {
  id: string
  name: string
  category: "gym" | "health-store" | "class"
  discount: number
  location: string
  description: string
  image: string
}

export default function OffersPage() {
  const [savedOffers, setSavedOffers] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<"all" | "gym" | "health-store" | "class">("all")

  const offers: Offer[] = [
    {
      id: "1",
      name: "FitZone Premium Gym",
      category: "gym",
      discount: 30,
      location: "Downtown District",
      description: "State-of-the-art equipment and professional trainers",
      image: "/modern-gym-interior.jpg",
    },
    {
      id: "2",
      name: "Yoga Flow Studio",
      category: "class",
      discount: 20,
      location: "East Side",
      description: "Beginner to advanced yoga classes",
      image: "/yoga-studio-peaceful.jpg",
    },
    {
      id: "3",
      name: "Organic Health Foods",
      category: "health-store",
      discount: 25,
      location: "Market Street",
      description: "Organic supplements and healthy snacks",
      image: "/health-food-store.jpg",
    },
    {
      id: "4",
      name: "CrossFit Elite",
      category: "gym",
      discount: 35,
      location: "Industrial Park",
      description: "High-intensity CrossFit training programs",
      image: "/crossfit-gym-training.jpg",
    },
    {
      id: "5",
      name: "Pilates & Core",
      category: "class",
      discount: 15,
      location: "Arts District",
      description: "Specialized pilates and core strengthening classes",
      image: "/pilates-class.jpg",
    },
    {
      id: "6",
      name: "VitaMax Nutrition",
      category: "health-store",
      discount: 20,
      location: "shopping-center",
      description: "Premium vitamins and nutritional supplements",
      image: "/nutrition-store-supplements.jpg",
    },
    {
      id: "7",
      name: "Cycle & Spin Center",
      category: "class",
      discount: 25,
      location: "Waterfront",
      description: "Indoor cycling and outdoor adventure rides",
      image: "/indoor-cycling-studio.jpg",
    },
    {
      id: "8",
      name: "Strength & Power Gym",
      category: "gym",
      discount: 28,
      location: "Tech District",
      description: "Weight lifting and strength training specialists",
      image: "/powerlifting-gym.jpg",
    },
  ]

  const filteredOffers = selectedCategory === "all" ? offers : offers.filter((o) => o.category === selectedCategory)

  const toggleSave = (offerId: string) => {
    setSavedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const categoryColors = {
    gym: { bg: "from-emerald-100 to-teal-100", border: "border-emerald-300", icon: "💪" },
    "health-store": { bg: "from-orange-100 to-yellow-100", border: "border-orange-300", icon: "🥗" },
    class: { bg: "from-purple-100 to-pink-100", border: "border-purple-300", icon: "🎯" },
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Exclusive Wellness Offers</h1>
        <p className="text-gray-600">Get special discounts on gyms, classes, and health stores</p>
      </motion.div>

      {/* Category Filter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All Offers" },
          { id: "gym", label: "Gyms" },
          { id: "class", label: "Classes" },
          { id: "health-store", label: "Health Stores" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:border-emerald-500"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer, index) => {
          const colors = categoryColors[offer.category]
          const isSaved = savedOffers.includes(offer.id)

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative group rounded-xl shadow-lg overflow-hidden cursor-pointer transition bg-gradient-to-br ${colors.bg} border-2 ${colors.border}`}
            >
              {/* Discount Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center flex-col shadow-xl"
              >
                <span className="text-2xl font-bold">{offer.discount}%</span>
                <span className="text-xs">OFF</span>
              </motion.div>

              {/* Save Button */}
              <button
                onClick={() => toggleSave(offer.id)}
                className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
              >
                <Heart className={`w-5 h-5 transition ${isSaved ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>

              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{offer.name}</h3>
                  <span className="text-lg">{colors.icon}</span>
                </div>

                <p className="text-gray-700 text-sm mb-3">{offer.description}</p>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {offer.location}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition"
                >
                  Claim Discount
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {savedOffers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-full shadow-lg font-bold cursor-pointer hover:shadow-xl transition"
        >
          {savedOffers.length} saved
        </motion.div>
      )}
    </div>
  )
}
