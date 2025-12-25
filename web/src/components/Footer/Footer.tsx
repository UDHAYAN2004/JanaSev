import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
     <footer className="bg-green-700 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">JanaSev</h2>
          <p className="text-sm text-gray-200">
            Empowering citizens by connecting them to the right government schemes with ease and transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/schemes" className="hover:text-white">Schemes</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
            <a href="https://github.com/" className="hover:text-gray-300"><FaGithub /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-green-600 mt-8 pt-4 text-center text-sm text-gray-200">
        <p>© {new Date().getFullYear()} JanaSev | Developed by <span className="font-semibold text-white">Udhayan S</span></p>
      </div>
    </footer>
  )
}

export default Footer