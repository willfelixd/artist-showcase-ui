import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CalendarDays,
  Music2,
  Video,
  MessageSquare,
  LogOut,
  Music,
  Menu,
  ExternalLink,
  Telescope,
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'
import { LanguageToggle } from '../../../components/ui/LanguageToggle'
import { useState } from 'react'

export default function AdminLayout() {
  const { t } = useTranslation()
  const { username, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { path: '/admin/agendamentos', icon: <CalendarDays size={18} />, label: t('admin.dashboard.bookings') },
    { path: '/admin/musicas', icon: <Music2 size={18} />, label: t('admin.dashboard.songs') },
    { path: '/admin/videos', icon: <Video size={18} />, label: t('admin.dashboard.videos') },
    { path: '/admin/mensagens', icon: <MessageSquare size={18} />, label: t('admin.dashboard.messages') },
  ]

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    textShadow: '0 2px 4px var(--shadow)',
    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'var(--bg-primary)' : 'transparent',
    transition: 'all 0.2s ease',
  })

  const Sidebar = () => (
    <aside style={{
      width: '220px',
      height: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      gap: '8px',
      transition: 'var(--transition-theme)',
      position: 'sticky',    // ← adicione para sidebar ficar visível ao rolar
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 8px',
        marginBottom: '24px',
        fontWeight: 600,
        textShadow: '0 2px 6px var(--shadow)',
        fontStyle: 'italic',
      }}>
        <Music size={20} color="var(--accent-primary)" />
        <span className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
          }}>
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            style={navLinkStyle}
            className="admin-nav-link"
            onClick={() => setSidebarOpen(false)}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ← Link para a Home */}
      <a href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          textShadow: '0 2px 4px var(--shadow)',
          color: 'var(--text-muted)',
          transition: 'all 0.2s ease',
          marginTop: '8px',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.color = 'var(--accent-primary)'
          el.style.backgroundColor = 'var(--bg-secondary)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.color = 'var(--text-muted)'
          el.style.backgroundColor = 'transparent'
        }}
      >
        <ExternalLink size={16} />
        {t('admin.dashboard.return_portfolio')}
      </a>

      {/* Footer da sidebar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
          padding: '0 8px',
          textShadow: '0 2px 4px var(--shadow)',
        }}>
          {username}
        </p>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            textShadow: '0 2px 4px var(--shadow)',
            transition: 'all 0.60s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.borderColor = 'var(--accent-primary)'
            el.style.color = 'var(--accent-primary)'
            el.style.backgroundColor = 'rgba(239,68,68,0.08)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.borderColor = 'var(--border)'
            el.style.color = 'var(--text-secondary)'
            el.style.backgroundColor = 'transparent'
          }}
        >
          <LogOut size={16} />
          {t('admin.dashboard.logout')}
        </button>
      </div>
    </aside>
  )

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      height: '100%',
      fontWeight: 'bold',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition-theme)',
    }}>

      {/* Sidebar desktop */}
      <div className="admin-sidebar-desktop"
        style={{ alignSelf: 'stretch' }} // ← estica até o fim do container pai
      >
        <Sidebar />
      </div>

      {/* Sidebar mobile — overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '220px' }}
          >
            <Sidebar />
          </div>
          {/* Área vazia à direita — clique aqui fecha o menu */}
        </div>
      )}

      {/* Conteúdo principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Header do admin */}
        <header style={{
          height: '56px',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          {/* Botão menu mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="admin-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'none',
              padding: '4px',
            }}
          >
            <Menu size={20} />
          </button>

          <span className="text-gradient-section"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textShadow: '0 2px 6px var(--shadow)',
            }}>
            {t('admin.dashboard.title')}
          </span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

            {/* ← Link para a Home */}
            <a href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                textShadow: '0 2px 4px var(--shadow)',
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                transition: 'all 0.60s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--accent-primary)'
                el.style.color = 'var(--accent-primary)'
                el.style.backgroundColor = 'rgba(239,68,68,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'var(--border)'
                el.style.color = 'var(--text-secondary)'
                el.style.backgroundColor = 'transparent'
              }}
            >
              <Telescope size={13} />
              {t('admin.dashboard.view_portfolio')}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </header>

        {/* Página atual */}
        <div style={{ flex: 1, padding: '32px 24px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        .admin-nav-link:hover {
        color: var(--accent-primary) !important;
        background-color: var(--bg-secondary) !important;
        }
        .admin-nav-link:hover svg {
          color: var(--accent-primary) !important;
        }
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}