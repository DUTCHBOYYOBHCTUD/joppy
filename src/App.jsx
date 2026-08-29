import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWidgets from './components/FloatingWidgets'
import Home from './pages/Home'
import WhyNZ from './pages/WhyNZ'
import Universities from './pages/Universities'
import Admissions from './pages/Admissions'
import Visa from './pages/Visa'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why-nz" element={<WhyNZ />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default App
