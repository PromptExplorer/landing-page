'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// This would typically come from a CMS or database
const blogPost = {
  title: "The Rise of AI Agents in Modern Software Development",
  excerpt: "Exploring how AI agents are revolutionizing the way we build and maintain software, from automated testing to intelligent code review.",
  content: `
    <p>Artificial Intelligence (AI) agents are rapidly transforming the landscape of software development, introducing new capabilities and efficiencies that were previously unimaginable. These intelligent assistants are becoming invaluable tools for developers, helping to streamline workflows and enhance productivity across the entire development lifecycle.</p>

    <h2>What are AI Agents?</h2>
    <p>AI agents are sophisticated software programs that can perceive their environment, make decisions, and take actions to achieve specific goals. In the context of software development, these agents can assist with various tasks, from code generation to testing and deployment.</p>

    <h2>Key Applications in Software Development</h2>
    <p>1. <strong>Automated Code Review:</strong> AI agents can analyze code for potential bugs, security vulnerabilities, and style inconsistencies, providing real-time feedback to developers.</p>
    <p>2. <strong>Intelligent Testing:</strong> These agents can generate test cases, identify edge cases, and automatically maintain test suites as code evolves.</p>
    <p>3. <strong>Code Generation:</strong> AI agents can suggest code completions, generate boilerplate code, and even propose entire functions based on natural language descriptions.</p>

    <h2>The Future of AI Agents</h2>
    <p>As AI technology continues to advance, we can expect these agents to become even more sophisticated, potentially handling increasingly complex development tasks and working alongside human developers in more collaborative ways.</p>
  `,
  date: "2024-03-20",
  author: {
    name: "Sarah Chen",
    role: "AI Research Engineer",
    avatar: "/authors/sarah-chen.jpg"
  },
  category: "Technology",
  readTime: "8 min read",
  tags: ["AI", "Software Development", "Technology", "Programming"]
}

export default function BlogPost() {
  const params = useParams()
  
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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
          >
            ← Back to all articles
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>{blogPost.category}</span>
              <span>•</span>
              <span>{blogPost.readTime}</span>
              <span>•</span>
              <span>{formatDate(blogPost.date)}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              {blogPost.excerpt}
            </p>

            <div className="flex items-center gap-4 border-t border-b border-gray-800 py-6">
              <div className="w-12 h-12 rounded-full bg-gray-700" />
              <div>
                <div className="text-white font-medium">{blogPost.author.name}</div>
                <div className="text-gray-400">{blogPost.author.role}</div>
              </div>
            </div>
          </div>

          <div 
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-white font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
} 