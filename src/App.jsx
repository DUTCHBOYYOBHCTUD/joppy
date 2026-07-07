import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWidgets from './components/FloatingWidgets'
import Home from './pages/Home'
import WhyNZ from './pages/WhyNZ'
import Universities from './pages/Universities'
import StudentLife from './pages/StudentLife'
import Admissions from './pages/Admissions'
import Visa from './pages/Visa'
import Scholarships from './pages/Scholarships'
import Testimonials from './pages/Testimonials'
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
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default App
