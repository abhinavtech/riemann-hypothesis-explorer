import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator as CalcIcon, BarChart3, Info } from 'lucide-react'
import { evaluate } from 'mathjs'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [calculatorMode, setCalculatorMode] = useState<'zeta' | 'prime' | 'general'>('zeta')

  const calculateZeta = (s: number): number => {
    // Simplified zeta function for demonstration (convergent for Re(s) > 1)
    if (s <= 1) return NaN
    let sum = 0
    for (let n = 1; n <= 1000; n++) {
      sum += 1 / Math.pow(n, s)
    }
    return sum
  }

  const isPrime = (n: number): boolean => {
    if (n < 2) return false
    if (n === 2) return true
    if (n % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false
    }
    return true
  }

  const primePi = (n: number): number => {
    // Prime counting function
    let count = 0
    for (let i = 2; i <= n; i++) {
      if (isPrime(i)) count++
    }
    return count
  }

  const primeApproximation = (n: number): number => {
    // Prime number theorem approximation
    if (n < 2) return 0
    return n / Math.log(n)
  }

  const handleCalculate = () => {
    if (!input.trim()) return

    try {
      let calculatedResult: string

      if (calculatorMode === 'zeta') {
        const s = parseFloat(input)
        if (isNaN(s)) {
          setResult('Invalid input. Please enter a number.')
          return
        }
        const zetaValue = calculateZeta(s)
        calculatedResult = `ζ(${s}) ≈ ${zetaValue.toFixed(6)}`
      } 
      else if (calculatorMode === 'prime') {
        const n = parseInt(input)
        if (isNaN(n) || n < 1) {
          setResult('Invalid input. Please enter a positive integer.')
          return
        }
        const count = primePi(n)
        const approximation = primeApproximation(n)
        const error = Math.abs(count - approximation)
        calculatedResult = `π(${n}) = ${count}\nApproximation: ${approximation.toFixed(2)}\nError: ${error.toFixed(2)}`
      }
      else {
        // General calculator
        const evalResult = evaluate(input)
        calculatedResult = `${input} = ${evalResult}`
      }

      setResult(calculatedResult)
    } catch (error) {
      setResult('Error: Invalid expression')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate()
    }
  }

  const quickCalculations = {
    zeta: [
      { label: 'ζ(2)', value: '2', description: 'Famous result: π²/6' },
      { label: 'ζ(3)', value: '3', description: 'Apéry\'s constant' },
      { label: 'ζ(4)', value: '4', description: 'π⁴/90' },
      { label: 'ζ(1.5)', value: '1.5', description: 'Convergent value' },
    ],
    prime: [
      { label: 'π(100)', value: '100', description: 'Primes up to 100' },
      { label: 'π(1000)', value: '1000', description: 'Primes up to 1000' },
      { label: 'π(10000)', value: '10000', description: 'Primes up to 10,000' },
      { label: 'π(50)', value: '50', description: 'Primes up to 50' },
    ],
    general: [
      { label: 'π', value: 'pi', description: 'Pi constant' },
      { label: 'e', value: 'e', description: 'Euler\'s number' },
      { label: 'log(10)', value: 'log(10)', description: 'Natural logarithm' },
      { label: 'sqrt(2)', value: 'sqrt(2)', description: 'Square root of 2' },
    ]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-riemann-gold">
          Mathematical Calculator
        </h1>
        <p className="text-xl text-gray-300">
          Explore the Riemann zeta function, prime numbers, and mathematical expressions
        </p>
      </motion.div>

      {/* Calculator Mode Selector */}
      <div className="mb-8 flex justify-center">
        <div className="flex bg-slate-800 rounded-lg p-1">
          {[
            { id: 'zeta', label: 'Zeta Function', icon: BarChart3 },
            { id: 'prime', label: 'Prime Counting', icon: CalcIcon },
            { id: 'general', label: 'General Math', icon: Info },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCalculatorMode(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                calculatorMode === id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Calculator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card mb-8"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-riemann-gold mb-2">
            {calculatorMode === 'zeta' && 'Riemann Zeta Function Calculator'}
            {calculatorMode === 'prime' && 'Prime Counting Function Calculator'}
            {calculatorMode === 'general' && 'General Mathematical Calculator'}
          </h3>
          <p className="text-gray-300 text-sm">
            {calculatorMode === 'zeta' && 'Calculate ζ(s) for values where Re(s) > 1'}
            {calculatorMode === 'prime' && 'Count prime numbers and compare with approximations'}
            {calculatorMode === 'general' && 'Evaluate mathematical expressions'}
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              calculatorMode === 'zeta' ? 'Enter s (e.g., 2, 3, 1.5)' :
              calculatorMode === 'prime' ? 'Enter n (e.g., 100, 1000)' :
              'Enter expression (e.g., 2+2, sin(pi/2))'
            }
            className="flex-1 bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <motion.button
            onClick={handleCalculate}
            className="bg-gradient-to-r from-purple-600 to-riemann-gold px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate
          </motion.button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4 mb-6"
          >
            <h4 className="text-lg font-semibold text-riemann-gold mb-2">Result:</h4>
            <pre className="text-white font-mono text-lg whitespace-pre-wrap">{result}</pre>
          </motion.div>
        )}

        {/* Quick Calculations */}
        <div className="border-t border-purple-500/30 pt-6">
          <h4 className="text-lg font-semibold text-purple-400 mb-4">Quick Calculations:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickCalculations[calculatorMode].map(({ label, value, description }) => (
              <motion.button
                key={label}
                onClick={() => setInput(value)}
                className="bg-slate-700 hover:bg-slate-600 border border-purple-500/30 rounded-lg p-3 text-left transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold text-purple-400">{label}</div>
                <div className="text-xs text-gray-400 mt-1">{description}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Information Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="game-card">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">Understanding the Results</h4>
          <div className="space-y-3 text-sm text-gray-300">
            {calculatorMode === 'zeta' && (
              <>
                <p>• ζ(2) = π²/6 ≈ 1.644934 (exact)</p>
                <p>• ζ(s) diverges for s ≤ 1</p>
                <p>• Values get smaller as s increases</p>
                <p>• Critical line is at Re(s) = 1/2</p>
              </>
            )}
            {calculatorMode === 'prime' && (
              <>
                <p>• π(n) counts primes ≤ n</p>
                <p>• Approximation: n/ln(n)</p>
                <p>• Error decreases as n increases</p>
                <p>• RH gives optimal error bounds</p>
              </>
            )}
            {calculatorMode === 'general' && (
              <>
                <p>• Supports basic arithmetic (+, -, *, /)</p>
                <p>• Functions: sin, cos, log, sqrt, etc.</p>
                <p>• Constants: pi, e</p>
                <p>• Complex expressions allowed</p>
              </>
            )}
          </div>
        </div>

        <div className="game-card">
          <h4 className="text-lg font-semibold text-riemann-gold mb-3">Mathematical Context</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              The Riemann zeta function connects number theory with complex analysis, 
              revealing deep patterns in prime distribution.
            </p>
            <p>
              Every calculation here relates to the fundamental question: 
              "How are prime numbers distributed among the integers?"
            </p>
            <p>
              The Riemann Hypothesis would provide the most precise answer to this question, 
              with implications across mathematics and computer science.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator 