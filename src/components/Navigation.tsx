import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, BarChart3, Gamepad2, Calculator } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/theory', icon: BookOpen, label: 'Theory' },
    { path: '/visualization', icon: BarChart3, label: 'Visualization' },
    { path: '/game', icon: Gamepad2, label: 'Game' },
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
  ]

  return (
    <nav className="bg-slate-900/50 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-riemann-gold">
            Riemann Explorer
          </Link>
          
          <div className="flex space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path
              
              return (
                <Link
                  key={path}
                  to={path}
                  className="relative"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'text-riemann-gold bg-purple-500/20' 
                        : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                    <span className="hidden md:block">{label}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-riemann-gold"
                      initial={false}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 