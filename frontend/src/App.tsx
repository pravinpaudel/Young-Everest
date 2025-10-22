import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import FixturesPage from './pages/FixturesPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ScrollToTop'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow relative mb-10">
          <div className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/fixtures" element={<FixturesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
