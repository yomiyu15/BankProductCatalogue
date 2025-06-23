"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Smartphone, Building, Shield } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  category: string // to determine icon/color
}

export default function ProductsOverview() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products")
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      } else {
        console.error("Failed to fetch products")
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  // Determine icon and color based on category (or product title)
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "digital banking":
        return { icon: Smartphone, color: "bg-blue-50 text-[#00adef]" }
      case "credit & loan":
        return { icon: CreditCard, color: "bg-green-50 text-green-600" }
      case "corporate banking":
        return { icon: Building, color: "bg-purple-50 text-purple-600" }
      case "security & insurance":
        return { icon: Shield, color: "bg-orange-50 text-orange-600" }
      default:
        return { icon: Smartphone, color: "bg-gray-100 text-gray-500" }
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of banking products and services designed to meet all your financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const { icon: Icon, color } = getIcon(product.category || product.title)
            return (
              <Card key={product.id} className="transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{product.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
