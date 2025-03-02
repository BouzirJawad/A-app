import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Csoon from './components/Csoon'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Csoon' element={<Csoon />} />
      </Routes>
    </Router>
  )
}

export default App