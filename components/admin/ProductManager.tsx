"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  icon: string
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newIcon, setNewIcon] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://10.12.53.34:5000api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const createProduct = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return

    setLoading(true)
    try {
      const response = await fetch("http://10.12.53.34:5000api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          icon: newIcon || "Package",
        }),
      })

      if (response.ok) {
        setNewTitle("")
        setNewDescription("")
        setNewIcon("")
        fetchProducts()
      }
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async () => {
    if (!editingProduct || !editingProduct.title.trim() || !editingProduct.description.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`http://10.12.53.34:5000api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          title: editingProduct.title,
          description: editingProduct.description,
          icon: editingProduct.icon,
        }),
      })

      if (response.ok) {
        setEditingProduct(null)
        fetchProducts()
      }
    } catch (error) {
      console.error("Error updating product:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setLoading(true)
    try {
      const response = await fetch(`http://10.12.53.34:5000api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Product title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Textarea
            placeholder="Product description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={3}
          />
          <Input
            placeholder="Icon name (optional, e.g., CreditCard, Smartphone)"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
          />
          <Button onClick={createProduct} disabled={loading || !newTitle.trim() || !newDescription.trim()}>
            Add Product
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  {editingProduct?.id === product.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingProduct.title}
                        onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      />
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3}
                      />
                      <Input
                        value={editingProduct.icon}
                        onChange={(e) => setEditingProduct({ ...editingProduct, icon: e.target.value })}
                        placeholder="Icon name"
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={updateProduct} disabled={loading}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{product.title}</h3>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                      <p className="text-xs text-gray-400 mt-2">Icon: {product.icon}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {products.length === 0 && <p className="text-gray-500">No products created yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
