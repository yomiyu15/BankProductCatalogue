"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [openItems, setOpenItems] = useState<number[]>([])

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch("https://backend-service-1wqi.onrender.com/api/faqs")
      if (response.ok) {
        const data = await response.json()
        setFaqs(data)
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error)
      // Fallback FAQs
      setFaqs([
        {
          id: 1,
          question: "How do I access the product catalog?",
          answer:
            'Click the "Get Started" button on the homepage to access our comprehensive product catalog with detailed documentation.',
        },
        {
          id: 2,
          question: "Are the product documents updated regularly?",
          answer:
            "Yes, our product documentation is updated regularly to reflect the latest features, terms, and conditions.",
        },
        {
          id: 3,
          question: "Can I download the product information?",
          answer: "Yes, all product documents are available in PDF format and can be downloaded for offline viewing.",
        },
      ])
    }
  }

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our banking products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="border border-gray-200">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(faq.id)}
              >
                <CardTitle className="flex justify-between items-center text-lg">
                  {faq.question}
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-[#00adef]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#00adef]" />
                  )}
                </CardTitle>
              </CardHeader>
              {openItems.includes(faq.id) && (
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
