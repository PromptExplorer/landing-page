'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built with performance in mind for the best user experience.',
    icon: '⚡️',
  },
  {
    title: 'Highly Secure',
    description: 'Enterprise-grade security to protect your data.',
    icon: '🔒',
  },
  {
    title: 'Easy to Use',
    description: 'Intuitive interface designed for maximum productivity.',
    icon: '🎯',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Amazing Features</h2>
          <p className="text-xl text-gray-600">Everything you need to succeed</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 