import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Music, Mail } from 'lucide-react'
import type { Artist } from '../../types'

interface HeroSectionProps {
  artist: Artist
}

export function HeroSection({ artist }: HeroSectionProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      padding: '48px 24px',
      background: `linear-gradient(
        135deg,
        var(--bg-primary) 0%,
        var(--bg-secondary) 100%
      )`,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        textAlign: 'center',
      }}>

        {/* Foto de perfil */}
        {artist.profileImageUrl && (
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid var(--accent-primary)',
            boxShadow: 'var(--shadow)',
          }}>
            <img
              src={artist.profileImageUrl}
              alt={artist.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Texto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {t('home.hero.greeting')}
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--text-primary)',
            lineHeight: '1.1',
            fontWeight: '400',
          }}>
            {artist.name}
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '600px',
            lineHeight: '1.7',
          }}>
            {artist.bio}
          </p>
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => navigate('/agenda')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-marfim)',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 28px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-hover)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-primary)'
            }}
          >
            <CalendarDays size={18} />
            {t('home.hero.cta_schedule')}
          </button>

          <button
            onClick={() => navigate('/repertorio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: 'var(--accent-primary)',
              border: '2px solid var(--accent-primary)',
              borderRadius: '8px',
              padding: '14px 28px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            <Music size={18} />
            {t('home.hero.cta_repertoire')}
          </button>

          <button
            onClick={() => navigate('/contato')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '2px solid var(--border)',
              borderRadius: '8px',
              padding: '14px 28px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              transition: 'all 0.2s ease',
            }}
          >
            <Mail size={18} />
            {t('home.hero.cta_contact')}
          </button>
        </div>
      </div>
    </section>
  )
}