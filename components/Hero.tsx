'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for joining our waitlist!')
        setEmail('')
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to join waitlist')
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 max-w-2xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Reclaim Your Time.
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Work With Purpose.
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Your intelligent scheduling companion—built to align your calendar with what truly matters.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading'}
              className={`px-6 py-3 rounded-lg font-semibold ${
                status === 'loading'
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
              } text-white`}
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </motion.button>
          </div>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-3 ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
        
        <p className="text-sm text-gray-400 mt-4">
          We'll notify you when we're ready to launch.
        </p>
      </motion.div>
    </section>
  )
} 