import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Schedule from './pages/Schedule'
import Repertoire from './pages/Repertoire'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import PrivacyPolicy from './pages/Terms/PrivacyPolicy'
import TermsOfUse from './pages/Terms/TermsOfUse'
import { useLocation } from 'react-router-dom'
import { AnimatedBackground } from './components/ui/AnimatedBackground'

function AppLayout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition-theme)',
      position: 'relative', // ← essencial para o absolute funcionar
    }}>
      {/* Background animado — só nas páginas públicas */}
      {!isAdmin && <AnimatedBackground />}
      {!isAdmin && <Header />}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/repertorio" element={<Repertoire />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    // ThemeProvider envolve tudo — tema disponível em qualquer componente
    <ThemeProvider>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}