import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { useTheme } from '../../contexts/ThemeContext'

export default function Home() {
  const { theme } = useTheme()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px'
    }}>
      <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
        Artist Showcase
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        Tema atual: <strong>{theme}</strong>
      </p>
      <ThemeToggle />
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 'var(--shadow)',
        color: 'var(--text-primary)'
      }}>
        Card de exemplo — muda com o tema
      </div>
    </div>
  )
}