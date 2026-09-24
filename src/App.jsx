import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWidgets from './components/FloatingWidgets'
import Home from './pages/Home'
import WhyNZ from './pages/WhyNZ'
import Universities from './pages/Universities'
import Admissions from './pages/Admissions'
import Visa from './pages/Visa'
import Contact from './pages/Contact'
import Consultation from './pages/Consultation'

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why-nz" element={<WhyNZ />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/book-consultation" element={<Navigate to="/consultation" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default App
