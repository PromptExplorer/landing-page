'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email to confirm.')
        setEmail('')
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated on AI Agent Developments
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get weekly insights, tutorials, and news about AI agents delivered to your inbox
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:border-white"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={status === 'loading'}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  status === 'loading'
                    ? 'bg-white/50 cursor-not-allowed'
                    : 'bg-white hover:bg-white/90'
                } text-purple-600`}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </div>
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-3 ${
                  status === 'success' ? 'text-green-200' : 'text-red-200'
                }`}
              >
                {message}
              </motion.p>
            )}
          </form>

          <div className="mt-8 text-white/80 text-sm">
            <p>Join our community of 5,000+ AI enthusiasts and developers</p>
            <p className="mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 