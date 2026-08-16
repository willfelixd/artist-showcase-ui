import { Music } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import type { CSSProperties } from 'react'
import type { NavLinkRenderProps } from 'react-router-dom'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/repertorio', label: t('nav.repertoire') },
    { path: '/videos', label: t('nav.videos') },
    { path: '/agenda', label: t('nav.schedule') },
    { path: '/contato', label: t('nav.contact') },
  ]

  const navLinkStyle = ({ isActive }: NavLinkRenderProps): CSSProperties => ({
    position: 'relative',
    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: isActive ? 600 : 500,
    padding: '8px 4px',
    borderRadius: '6px',
    textShadow: isActive
      ? '0 2px 6px var(--shadow)'
      : '0 1px 3px var(--shadow)',
    transition: 'color 0.25s ease, text-shadow 0.25s ease, transform 0.25s ease',
  })

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-background-header)',
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
          <Music size={24} color="var(--accent-primary)" />
          <span className="text-gradient-section"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.0rem',
              fontStyle: 'italic',
              lineHeight: '1.2',
              letterSpacing: '-0.7px',
              textShadow: '0 2px 6px var(--shadow)',
            }}>
            Isa Tavares
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
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
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
          background: 'var(--bg-background-header)',
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
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
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
        .nav-link:hover {
          color: var(--accent-primary) !important;
          text-shadow: 0 2px 6px var(--shadow);
          transform: translateY(-1px);
        }
        .mobile-nav-link:hover {
          color: var(--accent-primary) !important;
          background-color: var(--bg-secondary) !important;
          padding-left: 20px !important;
        }
      `}</style>
    </header>
  )
}