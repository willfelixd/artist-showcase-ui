import { useLanguage } from '../../contexts/LanguageContext'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: '500',
        fontFamily: 'var(--font-body)',
        transition: 'var(--transition-theme)',
        letterSpacing: '0.5px',
      }}
    >
      {language === 'pt-BR' ? 'EN' : 'PT'}
    </button>
  )
}