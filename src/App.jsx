import React from 'react'
import Navbar from './Components/Navbar'
import AppRoutes from './routes/Routes'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
