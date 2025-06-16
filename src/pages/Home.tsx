import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Brain } from 'lucide-react'

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20"
      >
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-riemann-gold to-purple-400">
          The Riemann Hypothesis
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Explore one of mathematics' greatest unsolved mysteries through interactive visualizations, 
          games, and deep mathematical insights. Discover the beauty of prime numbers and the critical line.
        </p>
        
        <div className="math-formula text-center mb-8">
          ζ(s) = Σ(n=1 to ∞) 1/n^s
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/theory"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-riemann-gold px-8 py-4 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <span>Start Exploring</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 py-16"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="game-card text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-riemann-gold">Learn the Theory</h3>
          <p className="text-gray-300 mb-6">
            Understand the mathematical foundations, from the zeta function to the critical line hypothesis.
          </p>
          <Link to="/theory" className="text-purple-400 hover:text-purple-300 flex items-center justify-center space-x-2">
            <span>Explore Theory</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="game-card text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-riemann-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-riemann-gold">Interactive Visualization</h3>
          <p className="text-gray-300 mb-6">
            See the zeta function come alive with real-time graphs and interactive zero exploration.
          </p>
          <Link to="/visualization" className="text-purple-400 hover:text-purple-300 flex items-center justify-center space-x-2">
            <span>Visualize</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="game-card text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-riemann-gold">Prime Prediction Game</h3>
          <p className="text-gray-300 mb-6">
            Test your understanding by predicting primes and exploring zero patterns in an engaging game format.
          </p>
          <Link to="/game" className="text-purple-400 hover:text-purple-300 flex items-center justify-center space-x-2">
            <span>Play Game</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.section>

      {/* Key Facts */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-16 border-t border-purple-500/30"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-riemann-gold">Key Facts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="game-card">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Million Dollar Problem</h3>
            <p className="text-gray-300">
              The Riemann Hypothesis is one of the Clay Institute's Millennium Prize Problems, 
              worth $1,000,000 for a correct proof or disproof.
            </p>
          </div>
          <div className="game-card">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">10 Trillion Zeros</h3>
            <p className="text-gray-300">
              Over 10 trillion non-trivial zeros have been computed, and all lie on the critical line, 
              supporting the hypothesis.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home 