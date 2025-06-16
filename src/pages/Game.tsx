import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Target, Zap, Star, RefreshCw } from 'lucide-react'

interface GameState {
  score: number
  level: number
  streak: number
  currentNumber: number
  gameMode: 'prime-prediction' | 'zero-hunt' | 'gap-game'
}

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    streak: 0,
    currentNumber: 2,
    gameMode: 'prime-prediction'
  })
  
  const [userGuess, setUserGuess] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isGameActive, setIsGameActive] = useState(false)

  const isPrime = (n: number): boolean => {
    if (n < 2) return false
    if (n === 2) return true
    if (n % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false
    }
    return true
  }

  const generateNextNumber = () => {
    const base = gameState.level * 10
    const randomOffset = Math.floor(Math.random() * 50) + 1
    return base + randomOffset
  }

  // Simplified approximation for demonstration - currently unused
  // const generateZeroApproximation = (t: number): number => {
  //   return Math.sin(t * 0.5) * Math.exp(-t * 0.01)
  // }

  const handleGuess = (guess: boolean) => {
    if (!isGameActive) return
    
    setUserGuess(guess)
    const correct = isPrime(gameState.currentNumber)
    const isCorrect = guess === correct
    
    let newScore = gameState.score
    let newStreak = gameState.streak
    
    if (isCorrect) {
      newScore += 10 * gameState.level
      newStreak += 1
      setFeedback(`Correct! ${gameState.currentNumber} is ${correct ? 'prime' : 'composite'}`)
    } else {
      newStreak = 0
      setFeedback(`Wrong! ${gameState.currentNumber} is ${correct ? 'prime' : 'composite'}`)
    }
    
    setGameState(prev => ({
      ...prev,
      score: newScore,
      streak: newStreak,
      level: Math.floor(newStreak / 5) + 1,
      currentNumber: generateNextNumber()
    }))
    
    setShowResult(true)
    setTimeLeft(10)
    
    setTimeout(() => {
      setShowResult(false)
      setUserGuess(null)
    }, 2000)
  }

  const startGame = () => {
    setIsGameActive(true)
    setGameState({
      score: 0,
      level: 1,
      streak: 0,
      currentNumber: generateNextNumber(),
      gameMode: 'prime-prediction'
    })
    setTimeLeft(10)
  }

  const resetGame = () => {
    setIsGameActive(false)
    setShowResult(false)
    setUserGuess(null)
    setFeedback('')
    setTimeLeft(10)
  }

  useEffect(() => {
    let timer: number
    if (isGameActive && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && isGameActive) {
      handleGuess(false) // Auto-fail on timeout
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isGameActive, showResult])

  const renderPrimeGame = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-6xl font-bold text-riemann-gold mb-4">
          {gameState.currentNumber}
        </div>
        <p className="text-xl text-gray-300">
          Is this number prime?
        </p>
        <div className="text-lg text-purple-400 mt-2">
          Time left: {timeLeft}s
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <motion.button
          onClick={() => handleGuess(true)}
          disabled={showResult}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          YES - Prime
        </motion.button>
        <motion.button
          onClick={() => handleGuess(false)}
          disabled={showResult}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          NO - Composite
        </motion.button>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg mb-4 ${
              userGuess === isPrime(gameState.currentNumber) 
                ? 'bg-green-900/50 border border-green-500' 
                : 'bg-red-900/50 border border-red-500'
            }`}
          >
            <p className="text-lg font-semibold">{feedback}</p>
            {gameState.currentNumber > 2 && (
              <p className="text-sm text-gray-300 mt-2">
                Factors: {Array.from({length: gameState.currentNumber}, (_, i) => i + 1)
                  .filter(i => gameState.currentNumber % i === 0)
                  .slice(0, 10)
                  .join(', ')}
                {gameState.currentNumber > 100 && '...'}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const renderZeroHunt = () => (
    <div className="text-center">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-riemann-gold mb-4">Zero Hunt</h3>
        <p className="text-gray-300">
          Find zeros of ζ(1/2 + it) by adjusting the imaginary part
        </p>
      </div>
      
      <div className="game-card max-w-md mx-auto">
        <p className="text-purple-400 mb-4">Coming Soon!</p>
        <p className="text-gray-300 text-sm">
          Interactive zero-finding mini-game where you adjust parameters to find 
          zeros of the Riemann zeta function on the critical line.
        </p>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-riemann-gold">
          Riemann Games
        </h1>
        <p className="text-xl text-gray-300">
          Test your understanding through interactive mathematical challenges
        </p>
      </motion.div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="game-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="text-riemann-gold mr-2" size={24} />
            <span className="text-lg font-semibold">Score</span>
          </div>
          <div className="text-2xl font-bold text-riemann-gold">{gameState.score}</div>
        </div>
        
        <div className="game-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="text-purple-400 mr-2" size={24} />
            <span className="text-lg font-semibold">Level</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{gameState.level}</div>
        </div>
        
        <div className="game-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="text-green-400 mr-2" size={24} />
            <span className="text-lg font-semibold">Streak</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{gameState.streak}</div>
        </div>
        
        <div className="game-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="text-yellow-400 mr-2" size={24} />
            <span className="text-lg font-semibold">Bonus</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {gameState.streak >= 5 ? 'x2' : 'x1'}
          </div>
        </div>
      </div>

      {/* Game Mode Selector */}
      <div className="mb-8 flex justify-center">
        <div className="flex bg-slate-800 rounded-lg p-1">
          {[
            { id: 'prime-prediction', label: 'Prime Prediction' },
            { id: 'zero-hunt', label: 'Zero Hunt' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setGameState(prev => ({ ...prev, gameMode: id as any }))}
              className={`px-4 py-2 rounded-md transition-colors ${
                gameState.gameMode === id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card mb-8 min-h-96"
      >
        {!isGameActive ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-riemann-gold mb-4">
              Ready to test your mathematical intuition?
            </h3>
            <p className="text-gray-300 mb-8">
              Challenge yourself with prime number prediction and explore the patterns 
              that make the Riemann Hypothesis so fascinating.
            </p>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-riemann-gold px-8 py-4 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </div>
        ) : gameState.gameMode === 'prime-prediction' ? (
          renderPrimeGame()
        ) : (
          renderZeroHunt()
        )}
      </motion.div>

      {/* Game Controls */}
      {isGameActive && (
        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} />
            <span>Reset Game</span>
          </motion.button>
        </div>
      )}

      {/* Educational Tips */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="game-card">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">Prime Prediction Tips</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Numbers ending in 2, 3, 5, 7 are more likely to be prime</li>
            <li>• Even numbers (except 2) are always composite</li>
            <li>• Use divisibility rules: 3 (sum of digits), 5 (ends in 0,5), 7, 11...</li>
            <li>• Large numbers are less likely to be prime (Prime Number Theorem)</li>
          </ul>
        </div>
        
        <div className="game-card">
          <h4 className="text-lg font-semibold text-riemann-gold mb-3">Connection to Riemann Hypothesis</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Prime distribution relates to zeta function zeros</li>
            <li>• RH would give precise error bounds for prime predictions</li>
            <li>• Your accuracy reflects the challenge mathematicians face</li>
            <li>• Patterns emerge but exceptions always exist</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Game 