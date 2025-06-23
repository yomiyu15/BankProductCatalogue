'use client'

import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
 


  return (
    <footer className="bg-gradient-to-b from-[#0a2540] to-[#0d2d4d] text-white pt-16 pb-8">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-48 bg-[#00adef] opacity-5 rounded-t-full transform scale-150"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#00adef] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#00adef] flex items-center">
              <div className="w-3 h-3 bg-[#00adef] rounded-full mr-2"></div>
              Media
            </h3>
            <ul className="space-y-3">
              {["Announcement", "News", "Press Release", "Internship", "Media Gallery", 
                "Election Result", "Video Gallery", "Vacancy Announcement", "Coopbank Annual Report", 
                "Michu Privacy Policy"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* CSR Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#00adef] flex items-center">
              <div className="w-3 h-3 bg-[#00adef] rounded-full mr-2"></div>
              Corporate Social Responsibility
            </h3>
            <ul className="space-y-3">
              {["Humanitarian Affairs", "Economic Affairs", "Environmental Affairs", 
                "Cultural Affairs", "Educational Affairs", "Health Affairs"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Banking Solutions */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#00adef] flex items-center">
              <div className="w-3 h-3 bg-[#00adef] rounded-full mr-2"></div>
              Banking Solution
            </h3>
            <ul className="space-y-3">
              {["Cooperative Saving Products", "Deposit Products", "Diaspora Banking", 
                "Interest Free Banking", "Loan and Advances", "Trade Service", 
                "Coopbank SACOO Link"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#00adef] flex items-center">
              <div className="w-3 h-3 bg-[#00adef] rounded-full mr-2"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Branch & ATM Locator", "Exchange Rate", "Forms", "Internet Banking", 
                "Copy at a Glance", "Corporate Identity", "Important Links"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-[#00adef] flex items-center">
              <div className="w-3 h-3 bg-[#00adef] rounded-full mr-2"></div>
              Contact us
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00adef] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <div className="font-semibold">Phone:</div>
                  <div>+251115150229</div>
                  <div>+251116162711</div>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00adef] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <div className="font-semibold">Email:</div>
                  <div>info@coopbankoromia.com.et</div>
                  <div>customercontactcenter@809.coopbankoromia.com.et</div>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00adef] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <div className="font-semibold">Address:</div>
                  <div>Addis Ababa, Bole Sub-city, Woreda 02, Housa No New</div>
                  <div>Bole Area, Around the Japan Embassy, Cooperative Bank of Oromia (S.U) Building</div>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00adef] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <div>
                  <div className="font-semibold">Swift Code:</div>
                  <div>CBORETAX</div>
                </div>
              </li>
            </ul>
          
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-[#00adef]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-[#00adef] mb-2">Cooperative Bank of Oromia</div>
            <p className="text-gray-400 text-sm">
              Empowering communities through inclusive financial services
            </p>
          </div>
          
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="w-10 h-10 rounded-full bg-[#00adef]/10 flex items-center justify-center cursor-pointer hover:bg-[#00adef]/20 transition-colors"
              >
               
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Cooperative Bank of Oromia. All rights reserved.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <span className="cursor-pointer hover:text-[#00adef]">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#00adef]">Terms of Service</span>
            <span className="cursor-pointer hover:text-[#00adef]">Accessibility</span>
            <span className="cursor-pointer hover:text-[#00adef]">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}