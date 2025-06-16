# Riemann Hypothesis Explorer 🔢

An interactive web application that gamifies the exploration of the Riemann Hypothesis - one of mathematics' greatest unsolved problems.

## 🌟 Features

### 🎓 Educational Theory Section
- Comprehensive explanation of the Riemann Hypothesis
- Interactive expandable sections covering:
  - Mathematical foundations
  - The hypothesis statement
  - Why it matters for mathematics and cryptography

### 📊 Interactive Visualizations
- **Critical Line Visualization**: See the famous line where Re(s) = 1/2
- **Zeta Function Zeros**: Explore the distribution of non-trivial zeros
- **Prime Gap Patterns**: Understand how primes are distributed
- Real-time D3.js powered charts with smooth animations

### 🎮 Gamified Learning
- **Prime Prediction Game**: Test your ability to identify prime numbers
- **Zero Hunt**: Interactive zero-finding challenges (coming soon)
- Scoring system with levels and streaks
- Educational tips and mathematical insights

### 🧮 Mathematical Calculator
- **Zeta Function Calculator**: Compute ζ(s) for various values
- **Prime Counting Function**: Calculate π(n) and compare with approximations  
- **General Mathematics**: Evaluate complex mathematical expressions
- Quick calculation presets for common values

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd riemann-hypothesis-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

This project is ready to deploy on various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to the `gh-pages` branch

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Visualizations**: D3.js for mathematical charts
- **Math**: Math.js for expression evaluation
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router

## 📱 Features Overview

### Home Page
- Hero section with engaging introduction
- Feature cards linking to different sections
- Key facts about the Riemann Hypothesis

### Theory Section
- Collapsible sections for different topics
- Mathematical formulas and explanations
- Visual aids and examples

### Visualization Section
- Three different chart types
- Interactive controls for animations
- Educational information panels

### Game Section
- Prime prediction mini-game
- Real-time scoring and feedback
- Educational tips and connections to RH

### Calculator Section
- Multiple calculator modes
- Quick calculation buttons
- Result formatting and explanations

## 🎨 Design Philosophy

- **Modern UI**: Gradient backgrounds, glassmorphism effects
- **Accessibility**: High contrast, keyboard navigation
- **Responsive**: Works on desktop, tablet, and mobile
- **Interactive**: Smooth animations and feedback
- **Educational**: Clear explanations at every step

## 🔬 Mathematical Accuracy

While this is an educational tool, we strive for mathematical accuracy:
- Zeta function calculations use series approximation
- Prime number algorithms are optimized for performance
- Known mathematical constants are used where available
- Approximations are clearly labeled

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs or suggest features
- Improve mathematical accuracy
- Add new visualizations
- Enhance the educational content
- Fix typos or improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Bernhard Riemann for the original hypothesis
- The mathematical community for continued research
- D3.js community for visualization tools
- React and TypeScript communities

## 📚 Learn More

- [Clay Mathematics Institute - Riemann Hypothesis](https://www.claymath.org/millennium-problems/riemann-hypothesis)
- [Wolfram MathWorld - Riemann Zeta Function](https://mathworld.wolfram.com/RiemannZetaFunction.html)
- [Prime Number Theorem](https://en.wikipedia.org/wiki/Prime_number_theorem)

---

*"The Riemann Hypothesis is the most important unsolved problem in mathematics."* - David Hilbert 