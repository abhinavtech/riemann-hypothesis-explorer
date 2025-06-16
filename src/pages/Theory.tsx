import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Lightbulb } from 'lucide-react'

const Theory = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basics'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const sections = [
    {
      id: 'basics',
      title: 'The Basics',
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The Riemann Hypothesis, proposed by Bernhard Riemann in 1859, concerns the distribution of prime numbers. 
            It's considered one of the most important unsolved problems in mathematics.
          </p>
          
          <div className="math-formula">
            ζ(s) = Σ(n=1 to ∞) 1/n^s = ∏(p prime) 1/(1-p^(-s))
          </div>
          
          <p className="text-gray-300">
            The Riemann zeta function ζ(s) is defined for complex numbers s with real part greater than 1. 
            Riemann proved it can be analytically continued to the entire complex plane, except for s = 1.
          </p>
          
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-riemann-gold mb-2">Key Insight:</h4>
            <p className="text-gray-300">
              The zeros of the zeta function are intimately connected to the distribution of prime numbers 
              through the explicit formula for the prime counting function.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'hypothesis',
      title: 'The Hypothesis Statement',
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-900/50 to-riemann-gold/20 p-6 rounded-lg border border-riemann-gold/30">
            <h4 className="text-xl font-semibold text-riemann-gold mb-4">Riemann Hypothesis:</h4>
            <p className="text-white text-lg">
              All non-trivial zeros of the Riemann zeta function have real part equal to 1/2.
            </p>
          </div>
          
          <p className="text-gray-300">
            In other words, if ζ(s) = 0 and s is not a negative even integer (trivial zero), 
            then s = 1/2 + it for some real number t.
          </p>
          
          <div className="math-formula">
            Critical Line: Re(s) = 1/2
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-400 mb-2">What we know:</h5>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 10+ trillion zeros computed</li>
                <li>• All found zeros are on the critical line</li>
                <li>• At least 40% of zeros are on the line</li>
                <li>• Related to prime number theorem</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h5 className="font-semibold text-riemann-gold mb-2">What we don't know:</h5>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Proof that ALL zeros are on the line</li>
                <li>• Whether any exceptions exist</li>
                <li>• Exact error bounds for primes</li>
                <li>• Complete distribution pattern</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'implications',
      title: 'Why It Matters',
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            If proven true, the Riemann Hypothesis would have profound implications for number theory, 
            cryptography, and our understanding of prime numbers.
          </p>
          
          <div className="grid gap-4">
            <div className="game-card">
              <h5 className="font-semibold text-purple-400 mb-2">Prime Number Distribution</h5>
              <p className="text-gray-300 text-sm">
                Would provide the best possible error bounds for the prime number theorem, 
                telling us exactly how primes are distributed among integers.
              </p>
            </div>
            
            <div className="game-card">
              <h5 className="font-semibold text-purple-400 mb-2">Cryptography</h5>
              <p className="text-gray-300 text-sm">
                Better understanding of prime gaps could impact the security of RSA encryption 
                and other cryptographic systems based on prime factorization.
              </p>
            </div>
            
            <div className="game-card">
              <h5 className="font-semibold text-purple-400 mb-2">Pure Mathematics</h5>
              <p className="text-gray-300 text-sm">
                Would resolve hundreds of theorems that are currently conditional on RH, 
                advancing multiple areas of mathematics simultaneously.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-riemann-gold">
          Understanding the Theory
        </h1>
        <p className="text-xl text-gray-300">
          Dive deep into the mathematical foundations of the Riemann Hypothesis
        </p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const isExpanded = expandedSections.includes(section.id)
          const Icon = section.icon
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="game-card"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-riemann-gold rounded-lg flex items-center justify-center">
                    <Icon className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-riemann-gold">{section.title}</h3>
                </div>
                {isExpanded ? 
                  <ChevronDown className="text-purple-400" size={24} /> : 
                  <ChevronRight className="text-purple-400" size={24} />
                }
              </button>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Theory 