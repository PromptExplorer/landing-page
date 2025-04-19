'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to the Future
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          Create something amazing with our innovative platform
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  )
} 