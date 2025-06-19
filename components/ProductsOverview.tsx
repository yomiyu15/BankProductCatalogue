import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Smartphone, Building, Shield } from "lucide-react"

const products = [
  {
    title: "Digital Banking Products",
    description: "Mobile banking, ATM services, online banking solutions",
    icon: Smartphone,
    color: "bg-blue-50 text-[#00adef]",
  },
  {
    title: "Credit & Loan Products",
    description: "Personal loans, business loans, credit cards, mortgages",
    icon: CreditCard,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Corporate Banking",
    description: "Business accounts, trade finance, cash management",
    icon: Building,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Security & Insurance",
    description: "Account protection, insurance products, fraud prevention",
    icon: Shield,
    color: "bg-orange-50 text-orange-600",
  },
]

export default function ProductsOverview() {
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
          {products.map((product, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 rounded-full ${product.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <product.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
