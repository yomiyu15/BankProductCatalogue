'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Img1 from "../assets/images/file.png"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white to-[#f0f9ff] text-[#1a1a1a] py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-30%] right-0 w-[700px] h-[700px] bg-[#00adef] opacity-10 rounded-3xl rotate-45 z-0" />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-[#00adef] opacity-5 rounded-full z-0" />
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI0MCIgc3Ryb2tlPSJyZ2JhKDAsIDE3MywgMjM5LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#00adef]/20 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-[#00adef] animate-pulse"></div>
              <span className="text-sm font-medium text-[#00adef]">Explore Our Products</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00adef] to-[#0084bd]">
              Explore Product Catalog
            </h1>
            
            <p className="text-lg md:text-xl text-[#333] max-w-xl leading-relaxed">
           Uncover a curated range of financial and innovative products tailored to your needs. From everyday banking to strategic investments, our hub empowers you to explore, compare, and choose with confidence all in one place.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="relative overflow-hidden group bg-gradient-to-r from-[#00adef] to-[#0084bd] text-white hover:from-[#009bd3] hover:to-[#0072a8] px-8 py-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </motion.div>
              </Link>
              
             
            </div>
            
            <div className="flex items-center mt-8 gap-4 text-sm text-[#666]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00adef] to-[#0084bd] border-2 border-white"
                  ></div>
                ))}
              </div>
              <div>
               <span className="font-semibold text-[#00adef]">Products+</span> 
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#00adef] to-[#0084bd] rounded-2xl blur-xl opacity-20"></div>
              
              <motion.div
                className="relative overflow-hidden rounded-2xl "
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={Img1}
                  alt="Banking Services"
                  width={550}
                  height={450}
                  className="object-cover"
                />
                
                {/* Decorative elements on image */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-[#00adef] to-[#0084bd] shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Floating cards */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00adef]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00adef]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Security</div>
                    <div className="font-semibold text-sm">Bank-grade</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00adef]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00adef]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Speed</div>
                    <div className="font-semibold text-sm">Instant Transfers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}