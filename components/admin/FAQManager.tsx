"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus } from "lucide-react"

interface FAQ {
  id: number
  question: string
  answer: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-service-1wqi.onrender.com"

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`)
      if (response.ok) {
        const data = await response.json()
        setFaqs(data)
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    }
  }

  const createFAQ = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
        }),
      })

      if (response.ok) {
        setNewQuestion("")
        setNewAnswer("")
        fetchFAQs()
      }
    } catch (error) {
      console.error("Error creating FAQ:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFAQ = async () => {
    if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/${editingFaq.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          question: editingFaq.question,
          answer: editingFaq.answer,
        }),
      })

      if (response.ok) {
        setEditingFaq(null)
        fetchFAQs()
      }
    } catch (error) {
      console.error("Error updating FAQ:", error)
    } finally {
      setLoading(false)
    }
  }

  const confirmDeleteFAQ = async () => {
    if (!faqToDelete) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/${faqToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        fetchFAQs()
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error)
    } finally {
      setLoading(false)
      setFaqToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New FAQ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
          <Textarea placeholder="Answer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} rows={4} />
          <Button onClick={createFAQ} disabled={loading || !newQuestion.trim() || !newAnswer.trim()}>
            Add FAQ
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-4">
                  {editingFaq?.id === faq.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingFaq.question}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      />
                      <Textarea
                        value={editingFaq.answer}
                        onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                        rows={4}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={updateFAQ} disabled={loading}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingFaq(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingFaq(faq)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setFaqToDelete(faq)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {faqs.length === 0 && <p className="text-gray-500">No FAQs created yet.</p>}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {faqToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete FAQ</h2>
            <p className="mb-6">
              Are you sure you want to delete <strong>{faqToDelete.question}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setFaqToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteFAQ} disabled={loading}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
