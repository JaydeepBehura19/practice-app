import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import './App.css'

// main app — handled intro animation, routing, and the floating background
function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [introFading, setIntroFading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // started fading out the intro after 2.5 seconds
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIntroFading(true)
    }, 2500)

    // removed the intro entirely after the fade-out animation
    const removeTimer = setTimeout(() => {
      setShowIntro(false)
    }, 3300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  // tracked mouse for glow effect
  useEffect(() => {
    const move = (e) => {
      const glow = document.querySelector('.cursor-glow')
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 110}px, ${e.clientY - 110}px)`
      }
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // navigated home when clicking the brand
  const handleBrandClick = () => {
    navigate('/')
  }

  return (
    <>
      <div className="cursor-glow"></div>
      
      {/* intro screen — showed once on first load */}
      {showIntro && (
        <div className={`intro-overlay ${introFading ? 'fade-out' : ''}`}>
          {/* floating particles in the background */}
          <div className="intro-particles">
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="particle" key={i}></div>
            ))}
          </div>

          {/* pulsing glow rings */}
          <div className="intro-glow-ring"></div>
          <div className="intro-glow-ring"></div>
          <div className="intro-glow-ring"></div>

          {/* main intro text */}
          <div className="intro-content">
            <div className="intro-label">Digital User Directory</div>
            <h1 className="intro-title" data-text="Day 5 Assignment">
              Day 5 Assignment
            </h1>
            <div className="intro-subtitle">Loading something beautiful...</div>
          </div>
        </div>
      )}

      {/* animated background blobs — always visible behind content */}
      <div className="app-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* main app content */}
      <div className="app-content">
        {/* sticky navbar */}
        <nav className="navbar">
          <div className="navbar-brand" onClick={handleBrandClick}>
            <div className="navbar-logo">DU</div>
            <span className="navbar-title">Digital Directory</span>
          </div>
          <span className="navbar-tag">Day 5</span>
        </nav>

        {/* page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
