import { Music } from 'lucide-react'
import { useEffect, useState } from 'react'
import { artistService } from '../../services/artistService'
import type { Artist } from '../../types'

// SVGs das redes sociais inline
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export function Footer() {
  const [artist, setArtist] = useState<Artist | null>(null)

  useEffect(() => {
    artistService.getProfile()
      .then(setArtist)
      .catch(() => {})
  }, [])

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
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
          <Music size={20} color="var(--accent-primary)" />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
          }}>
            Isa Cantora
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
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'
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
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'
                }}
              >
                <YouTubeIcon />
              </a>
            )}
          </div>
        )}

        {/* Copyright */}
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '13px',
          fontFamily: 'var(--font-body)',
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