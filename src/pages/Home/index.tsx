import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { LanguageToggle } from '../../components/ui/LanguageToggle'
import { useTheme } from '../../contexts/ThemeContext'

export default function Home() {
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '24px',
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-display)',
        fontSize: '2.5rem',
      }}>
        {t('home.hero.greeting')} Isa
      </h1>

      <p style={{ color: 'var(--text-secondary)' }}>
        Tema: <strong>{theme}</strong>
      </p>

      {/* Botões de toggle lado a lado */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* Card de exemplo com traduções */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minWidth: '300px',
      }}>
        <p style={{ color: 'var(--text-primary)' }}>
          🎵 {t('repertoire.title')}
        </p>
        <p style={{ color: 'var(--text-primary)' }}>
          📅 {t('schedule.title')}
        </p>
        <p style={{ color: 'var(--text-primary)' }}>
          📞 {t('contact.title')}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          {t('common.loading')}
        </p>
      </div>

      <button style={{
        backgroundColor: 'var(--accent-primary)',
        color: 'var(--color-marfim)',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
      }}>
        {t('home.hero.cta_schedule')}
      </button>
    </div>
  )
}