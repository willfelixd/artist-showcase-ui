import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const { isDark } = useTheme()

  const isEN = language === 'en'

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
    fontSize: '8px',
    fontWeight: 700,
    color: 'var(--text-secondary)',
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
    transform: isEN ? 'translateX(20px)' : 'translateX(0px)',
    transition: 'transform 0.60s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'var(--shadow)',
    fontSize: '8px',
    fontWeight: 700,
    color: isDark ? '#fff' : '#1a1919',
    position: 'relative',
    zIndex: 2,
  }

  return (
    <button onClick={toggleLanguage} style={trackStyle}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'var(--accent-hover2)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'var(--bg-background-footer)'
      }}
    >
      {/* Labels fixos */}
      <div style={contentStyle}>
        <span>En</span>
        <span>Pt</span>
      </div>

      {/* Thumb */}
      <div style={thumbStyle}>
        {isEN ? 'Pt' : 'En'}
      </div>
    </button>
  )
}