'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  slug: string
  category: string
}

const featuredPosts: BlogPost[] = [
  {
    title: "The Rise of AI Agents in Modern Software Development",
    excerpt: "Exploring how AI agents are revolutionizing the way we build and maintain software.",
    date: "2024-03-20",
    slug: "rise-of-ai-agents",
    category: "Technology"
  },
  {
    title: "Understanding Large Language Model Agents",
    excerpt: "A deep dive into how LLMs power the next generation of AI agents.",
    date: "2024-03-18",
    slug: "understanding-llm-agents",
    category: "AI Research"
  },
]

export default function Hero() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            AI Agent Insights
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Exploring the frontier of AI agents, autonomous systems, and the future of human-AI collaboration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <span className="text-sm text-purple-400">{post.category}</span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
                  <span className="text-purple-400 hover:text-purple-300">Read more →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            href="/blog"
            className="inline-block px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 