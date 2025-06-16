import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Theory from './pages/Theory'
import Visualization from './pages/Visualization'
import Game from './pages/Game'
import Calculator from './pages/Calculator'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/game" element={<Game />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  )
}

export default App 