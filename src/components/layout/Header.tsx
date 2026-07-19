import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Music } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '/',            label: t('nav.home') },
    { path: '/repertorio',  label: t('nav.repertoire') },
    { path: '/videos',      label: t('nav.videos') },
    { path: '/agenda',      label: t('nav.schedule') },
    { path: '/contato',     label: t('nav.contact') },
  ]

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: isActive ? '600' : '400',
    padding: '4px 0',
    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
    transition: 'all 0.2s ease',
  })

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      transition: 'var(--transition-theme)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={22} color="var(--accent-primary)" />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            Isa Cantora
          </span>
        </NavLink>

        {/* Navegação desktop */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
          className="desktop-nav"
        >
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={navLinkStyle}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Controles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle />
          <LanguageToggle />

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'none',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav style={{
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      {/* Responsividade via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}