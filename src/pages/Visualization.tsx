import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { Play, Pause, RotateCcw } from 'lucide-react'

const Visualization = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedView, setSelectedView] = useState<'critical-line' | 'zeta-zeros' | 'prime-gaps'>('critical-line')
  // Animation speed control - currently unused
  // const [animationSpeed, setAnimationSpeed] = useState(1)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 800
    const height = 400
    const margin = { top: 20, right: 20, bottom: 40, left: 40 }

    svg.attr("width", width).attr("height", height)

    if (selectedView === 'critical-line') {
      drawCriticalLine(svg, width, height, margin)
    } else if (selectedView === 'zeta-zeros') {
      drawZetaZeros(svg, width, height, margin)
    } else if (selectedView === 'prime-gaps') {
      drawPrimeGaps(svg, width, height, margin)
    }
  }, [selectedView])

  const drawCriticalLine = (svg: any, width: number, height: number, margin: any) => {
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([-1, 2])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([-20, 20])
      .range([innerHeight, 0])

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Real Part')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -25)
      .attr('x', -innerHeight / 2)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Imaginary Part')

    // Critical line at Re(s) = 1/2
    g.append('line')
      .attr('x1', xScale(0.5))
      .attr('x2', xScale(0.5))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#7c3aed')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5')

    // Add critical line label
    g.append('text')
      .attr('x', xScale(0.5) + 10)
      .attr('y', 20)
      .attr('fill', '#7c3aed')
      .attr('font-size', '14px')
      .text('Critical Line (Re = 1/2)')

    // Sample zeros on the critical line
    const knownZeros = [14.134725, 21.022040, 25.010858, 30.424876, 32.935062]
    
    knownZeros.forEach((zero, i) => {
      g.append('circle')
        .attr('cx', xScale(0.5))
        .attr('cy', yScale(zero))
        .attr('r', 0)
        .attr('fill', '#f59e0b')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .transition()
        .delay(i * 200)
        .duration(800)
        .attr('r', 6)

      g.append('circle')
        .attr('cx', xScale(0.5))
        .attr('cy', yScale(-zero))
        .attr('r', 0)
        .attr('fill', '#f59e0b')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .transition()
        .delay(i * 200)
        .duration(800)
        .attr('r', 6)
    })
  }

  const drawZetaZeros = (svg: any, width: number, height: number, margin: any) => {
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create a visualization showing the density of zeros
    const data = Array.from({length: 50}, (_, i) => ({
      t: 10 + i * 2,
      density: Math.sin(i * 0.3) * 0.5 + 1
    }))

    const xScale = d3.scaleLinear()
      .domain([10, 110])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, 2])
      .range([innerHeight, 0])

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Height (t)')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -25)
      .attr('x', -innerHeight / 2)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Zero Density')

    // Line chart
    const line = d3.line<any>()
      .x(d => xScale(d.t))
      .y(d => yScale(d.density))
      .curve(d3.curveCardinal)

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#7c3aed')
      .attr('stroke-width', 3)
      .attr('d', line)

    // Points
    g.selectAll('.zero-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'zero-point')
      .attr('cx', (d: any) => xScale(d.t))
      .attr('cy', (d: any) => yScale(d.density))
      .attr('r', 4)
      .attr('fill', '#f59e0b')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
  }

  const drawPrimeGaps = (svg: any, width: number, height: number, margin: any) => {
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Simple prime gaps visualization
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    const gaps = primes.slice(1).map((p, i) => ({ prime: p, gap: p - primes[i] }))

    const xScale = d3.scaleLinear()
      .domain([0, primes.length])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...gaps.map(g => g.gap))])
      .range([innerHeight, 0])

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Prime Index')

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -25)
      .attr('x', -innerHeight / 2)
      .attr('fill', '#f59e0b')
      .style('text-anchor', 'middle')
      .text('Gap Size')

    // Bars
    g.selectAll('.gap-bar')
      .data(gaps)
      .enter()
      .append('rect')
      .attr('class', 'gap-bar')
      .attr('x', (_: any, i: number) => xScale(i))
      .attr('y', (d: any) => yScale(d.gap))
      .attr('width', xScale(1) - xScale(0) - 2)
      .attr('height', (d: any) => innerHeight - yScale(d.gap))
      .attr('fill', '#7c3aed')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 1)
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const resetVisualization = () => {
    setIsAnimating(false)
    // Trigger re-render
    setSelectedView(selectedView)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-riemann-gold">
          Interactive Visualizations
        </h1>
        <p className="text-xl text-gray-300">
          Explore the Riemann Hypothesis through dynamic, interactive graphs
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex bg-slate-800 rounded-lg p-1">
          {[
            { id: 'critical-line', label: 'Critical Line' },
            { id: 'zeta-zeros', label: 'Zero Density' },
            { id: 'prime-gaps', label: 'Prime Gaps' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedView(id as any)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedView === id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAnimation}
            className="flex items-center space-x-2 bg-riemann-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            {isAnimating ? <Pause size={20} /> : <Play size={20} />}
            <span>{isAnimating ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={resetVisualization}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card mb-8"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-riemann-gold mb-2">
            {selectedView === 'critical-line' && 'Riemann Zeta Function - Critical Line'}
            {selectedView === 'zeta-zeros' && 'Distribution of Zeta Function Zeros'}
            {selectedView === 'prime-gaps' && 'Prime Number Gap Patterns'}
          </h3>
          <p className="text-gray-300 text-sm">
            {selectedView === 'critical-line' && 'All non-trivial zeros lie on the line Re(s) = 1/2'}
            {selectedView === 'zeta-zeros' && 'Density and distribution of zeros along the critical strip'}
            {selectedView === 'prime-gaps' && 'Gaps between consecutive prime numbers'}
          </p>
        </div>

        <div className="flex justify-center">
          <svg
            ref={svgRef}
            className="border border-purple-500/30 rounded-lg bg-slate-900/50"
          />
        </div>
      </motion.div>

      {/* Information Panel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="game-card">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">Understanding the Visualization</h4>
          <div className="space-y-2 text-sm text-gray-300">
            {selectedView === 'critical-line' && (
              <>
                <p>• The vertical dashed line shows the critical line where Re(s) = 1/2</p>
                <p>• Golden circles represent known non-trivial zeros</p>
                <p>• All computed zeros lie exactly on this line</p>
                <p>• The hypothesis states ALL zeros must be here</p>
              </>
            )}
            {selectedView === 'zeta-zeros' && (
              <>
                <p>• Shows the density of zeros as height increases</p>
                <p>• Purple line indicates the general trend</p>
                <p>• Golden points mark specific zero locations</p>
                <p>• Pattern becomes more regular at higher values</p>
              </>
            )}
            {selectedView === 'prime-gaps' && (
              <>
                <p>• Purple bars show gaps between consecutive primes</p>
                <p>• Irregular pattern despite underlying structure</p>
                <p>• Riemann Hypothesis would explain this distribution</p>
                <p>• Related to the Prime Number Theorem</p>
              </>
            )}
          </div>
        </div>

        <div className="game-card">
          <h4 className="text-lg font-semibold text-riemann-gold mb-3">Key Insights</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Over 10 trillion zeros have been computed</p>
            <p>• All found zeros lie on the critical line</p>
            <p>• This supports but doesn't prove the hypothesis</p>
            <p>• A single counterexample would disprove it</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visualization 