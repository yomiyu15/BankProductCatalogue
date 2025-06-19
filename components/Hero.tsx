"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Img1 from "../assets/images/file.png"

export default function Hero() {
  return (
    <section className="relative bg-white text-[#1a1a1a] py-20 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-[-30%] right-0 w-[700px] h-[700px] bg-[#00adef] opacity-10 rounded-3xl rotate-45 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#00adef] leading-snug">
                Explore Product Catalog
            </h2>
            <p className="text-base md:text-lg text-[#333] max-w-xl">
              At Coopbank, we’re proud to be a digital-first bank offering modern, secure, and agile banking services. 
              Discover a comprehensive range of solutions designed to empower your financial journey.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#00adef] text-white hover:bg-[#009bd3] px-6 py-3 rounded-md text-base shadow-md transition-all"
                >
                  Get Started
                </Button>
              </Link>
             
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={Img1}
              alt="Banking Services"
              width={500}
              height={400}
              
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
