import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
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

// Rota protegida — redireciona para login se não autenticado
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function AppLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition-theme)',
    }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/repertorio" element={<Repertoire />} />
          <Route path="/contato" element={<Contact />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
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