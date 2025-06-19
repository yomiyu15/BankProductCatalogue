export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#00adef] mb-4">Cooperative Bank of Oromia</h3>
            <p className="text-gray-300 mb-4">
              Empowering communities through inclusive financial services. We’re dedicated to supporting sustainable development and prosperity across Oromia and beyond.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-[#00adef] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-[#00adef] transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#00adef] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@coopbankoromia.com</li>
              <li>Phone: +251 (11) 123 4567</li>
              <li>Address: Africa Avenue, Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Cooperative Bank of Oromia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
