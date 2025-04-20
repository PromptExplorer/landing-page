'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    title: 'AI Agent Development',
    description: 'Deep dives into building, training, and deploying AI agents for various applications.',
    icon: '🤖',
    slug: 'ai-agent-development',
    postCount: 12
  },
  {
    title: 'LLM Integration',
    description: 'Exploring how to integrate large language models into autonomous agents.',
    icon: '🧠',
    slug: 'llm-integration',
    postCount: 8
  },
  {
    title: 'Agent Architecture',
    description: 'Understanding the fundamental architectures behind successful AI agents.',
    icon: '🏗️',
    slug: 'agent-architecture',
    postCount: 10
  },
  {
    title: 'Use Cases',
    description: 'Real-world applications and success stories of AI agents in production.',
    icon: '💡',
    slug: 'use-cases',
    postCount: 15
  },
  {
    title: 'Ethics & Safety',
    description: 'Discussing the ethical considerations and safety measures in AI agent deployment.',
    icon: '🛡️',
    slug: 'ethics-safety',
    postCount: 7
  },
  {
    title: 'Future Trends',
    description: 'Exploring emerging trends and the future of AI agent technology.',
    icon: '🔮',
    slug: 'future-trends',
    postCount: 9
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Explore Topics</h2>
          <p className="text-xl text-gray-300">Dive deep into the world of AI agents</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/category/${category.slug}`}>
                <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-400">{category.postCount} articles</span>
                    <span className="text-purple-400 group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 