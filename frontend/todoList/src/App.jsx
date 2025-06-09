import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer'

import './App.css'
import Navbar from './components/Navbar'
import About from './pages/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <div>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPaths: true }}>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </div>
    </div>
      

    </>
  )
}

export default App
