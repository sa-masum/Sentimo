import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
