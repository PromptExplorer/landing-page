'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  slug: string
  category: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    title: "The Rise of AI Agents in Modern Software Development",
    excerpt: "Exploring how AI agents are revolutionizing the way we build and maintain software, from automated testing to intelligent code review.",
    date: "2024-03-20",
    slug: "rise-of-ai-agents",
    category: "Technology",
    readTime: "8 min read"
  },
  {
    title: "Understanding Large Language Model Agents",
    excerpt: "A deep dive into how LLMs power the next generation of AI agents, exploring architectures, capabilities, and limitations.",
    date: "2024-03-18",
    slug: "understanding-llm-agents",
    category: "AI Research",
    readTime: "12 min read"
  },
  {
    title: "Building Your First AI Agent with Python",
    excerpt: "Step-by-step tutorial on creating a simple but effective AI agent using Python and popular machine learning libraries.",
    date: "2024-03-15",
    slug: "building-first-ai-agent",
    category: "Tutorial",
    readTime: "15 min read"
  },
  {
    title: "Ethics in AI Agent Development",
    excerpt: "Exploring the ethical considerations and best practices when developing AI agents for real-world applications.",
    date: "2024-03-12",
    slug: "ethics-ai-agent-development",
    category: "Ethics & Safety",
    readTime: "10 min read"
  }
]

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Latest Articles
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the latest insights, tutorials, and discussions about AI agents and their impact on technology.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-400">{post.category}</span>
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
                    <span className="text-purple-400 hover:text-purple-300">Read more →</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </main>
  )
} 