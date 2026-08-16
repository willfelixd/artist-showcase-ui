import { Music } from 'lucide-react'
import { useEffect, useState } from 'react'
import { artistService } from '../../services/artistService'
import type { Artist } from '../../types'

// SVGs das redes sociais inline
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.43 0 .06 5.37.06 12c0 2.12.55 4.19 1.6 6.02L0 24l6.17-1.62A11.94 11.94 0 0 0 12.06 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.54-8.52zM12.06 21.8c-1.8 0-3.55-.48-5.1-1.4l-.36-.21-3.66.96.98-3.57-.23-.37a9.77 9.77 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.87 6.92c0 5.4-4.4 9.79-9.73 9.79zm5.37-7.34c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.1-.23-.55-.47-.47-.64-.48-.17-.01-.36-.01-.55-.01s-.51.07-.78.36c-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.17 3 .15.19 2.03 3.1 4.93 4.34.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
    </svg>
  )
}

export function Footer() {
  const [artist, setArtist] = useState<Artist | null>(null)
  const WHATSAPP_URL = "https://wa.me/5583998184555?text=Olá%20quero%20saber%20sobre%20shows"

  useEffect(() => {
    artistService.getProfile()
      .then(setArtist)
      .catch(() => { })
  }, [])

  return (
    <footer style={{
      zIndex: 0,
      background: 'var(--bg-background-footer)',
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      marginTop: 'auto',
      transition: 'var(--transition-theme)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={23} color="var(--accent-primary)" />
          <span className="text-gradient-section"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              lineHeight: '1.2',
              letterSpacing: '-0.7px',
              textShadow: '0 2px 6px var(--shadow)',
            }}>
            Isa Tavares Cantora
          </span>
        </div>

        {/* Links sociais */}
        {artist && (
          <div style={{ display: 'flex', gap: '16px' }}>
            {artist.instagramUrl && (
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  color: 'var(--accent-primary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-hover)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)'
                }}
              >
                <InstagramIcon />
              </a>
            )}
            {artist.youtubeUrl && (
              <a
                href={artist.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  color: 'var(--accent-primary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-hover)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)'
                }}
              >
                <YouTubeIcon />
              </a>
            )}
            {artist && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  color: 'var(--accent-primary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-hover)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)'
                }}
              >
                <WhatsAppIcon />
              </a>
            )}
          </div>
        )}

        {/* Copyright */}
        <p style={{
          color: 'var(--text-primary)',
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
          textShadow: '0 2px 4px var(--shadow)',
        }}>
          © {new Date().getFullYear()} Isa Tavares. Todos os direitos reservados.
        </p>

        {/* Admin */}

        <a href="/admin/login"
          style={{
            color: 'var(--text-muted)',
            fontSize: '11px',
            fontFamily: 'var(--font-body)',
            textDecoration: 'none',
            opacity: 0.5,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5'}
        >
          Admin
        </a>
      </div>
    </footer>
  )
}