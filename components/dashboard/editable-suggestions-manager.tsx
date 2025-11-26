"use client"

import { motion } from "framer-motion"
import { X, Save, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

interface Suggestion {
  id: string
  title: string
  message: string
  impact: "add" | "reduce"
  description: string
}

interface EditableSuggestionsManagerProps {
  onClose: () => void
}

export default function EditableSuggestionsManager({ onClose }: EditableSuggestionsManagerProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Add Cardio Sessions",
      message:
        "Based on your recent progress and 15-day streak, we recommend adding 2 more cardio sessions per week to boost your endurance",
      impact: "add",
      description: "+ 2 sessions/week",
    },
    {
      id: "2",
      title: "Reduce Training",
      message:
        "You seem to be overtraining with 5 gym sessions this week. Consider reducing to 4 sessions and add a rest day",
      impact: "reduce",
      description: "- 1 session/week",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Suggestion | null>(null)

  useEffect(() => {
    // Load saved suggestions from localStorage
    const saved = localStorage.getItem("customSuggestions")
    if (saved) {
      setSuggestions(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("customSuggestions", JSON.stringify(suggestions))
    alert("Suggestions saved successfully!")
  }

  const handleEdit = (suggestion: Suggestion) => {
    setEditingId(suggestion.id)
    setEditForm({ ...suggestion })
  }

  const handleUpdateSuggestion = () => {
    if (editForm) {
      setSuggestions((prev) => prev.map((s) => (s.id === editingId ? editForm : s)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleAddSuggestion = () => {
    const newSuggestion: Suggestion = {
      id: Date.now().toString(),
      title: "New Suggestion",
      message: "Enter your suggestion message here",
      impact: "add",
      description: "Enter description",
    }
    setSuggestions((prev) => [...prev, newSuggestion])
  }

  const handleDeleteSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold">Edit Custom Suggestions</h3>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {editingId ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 p-4 rounded-lg space-y-3 border-2 border-blue-200"
            >
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Title</label>
                <input
                  type="text"
                  value={editForm?.title || ""}
                  onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Message</label>
                <textarea
                  value={editForm?.message || ""}
                  onChange={(e) => setEditForm({ ...editForm!, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Type</label>
                  <select
                    value={editForm?.impact || "add"}
                    onChange={(e) => setEditForm({ ...editForm!, impact: e.target.value as "add" | "reduce" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="add">Add Activity</option>
                    <option value="reduce">Reduce Activity</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
                  <input
                    type="text"
                    value={editForm?.description || ""}
                    onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., +2 sessions/week"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleUpdateSuggestion}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingId(null)
                    setEditForm(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : null}

          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              layout
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        suggestion.impact === "add"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {suggestion.description}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 ml-3 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(suggestion)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteSuggestion(suggestion.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t bg-gray-50 p-4 flex gap-3 flex-shrink-0">
          <button
            onClick={handleAddSuggestion}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition flex-1"
          >
            <Plus className="w-4 h-4" />
            Add New Suggestion
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex-1"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
