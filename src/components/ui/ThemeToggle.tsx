import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '999px',
    background: 'var(--bg-background-footer)',
    border: isDark ? '1px solid var(--border)' : '0px solid var(--border)',
    cursor: 'pointer',
    padding: '2px',
  }

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 6px',
    pointerEvents: 'none',
  }

  const thumbStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: 'var(--pink-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isDark ? 'translateX(20px)' : 'translateX(0px)',
    transition: 'transform 0.60s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'var(--shadow)',
    willChange: 'transform',
  }

  return (
    <button onClick={toggleTheme} style={trackStyle}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'var(--accent-hover2)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'var(--bg-background-footer)'
      }}
    >
      {/* Ícones fixos */}
      <div style={contentStyle}>
        <Moon size={10} color="var(--text-secondary)" />
        <Sun size={10} color="var(--text-secondary)" />
      </div>

      {/* Thumb */}
      <div style={thumbStyle}>
        {isDark ? <Sun size={12} color="#fff" /> : <Moon size={12} color="#1a1919" />}
      </div>
    </button>
  )
}