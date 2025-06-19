import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProductsOverview from "@/components/ProductsOverview"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductsOverview />
      <FAQ />
      <Footer />
    </main>
  )
}
