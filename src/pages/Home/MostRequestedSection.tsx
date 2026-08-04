import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Music2 } from 'lucide-react'
import { songService } from '../../services/songService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import type { Song } from '../../types'

export function MostRequestedSection() {
  const { t } = useTranslation()
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    songService.findMostRequested()
      .then(page => setSongs(page.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (songs.length === 0) return null

  return (
    <section style={{
      padding: '80px 24px',
      position: 'relative',
      background: 'transparent',
      transition: 'var(--transition-theme)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Título */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          marginBottom: '40px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          {t('home.sections.mostRequested')}
        </h2>

        {/* Grid de músicas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="card-glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                }}
            >
              {/* Número */}
              <span className="text-glow" 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                minWidth: '32px',
                fontWeight: '300',
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>

              <Music2 size={18} color="var(--text-muted)" />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {song.title}
                </p>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {song.genre}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de scroll */}
        <div style={{
          position: 'absolute',
          bottom: '1px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s infinite',
          cursor: 'pointer',
        }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
          }}
        >
          <span style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.5rem, 2vw, 0.5rem)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {t('home.sections.scroll_hint')}
          </span>
          <div style={{
            width: '24px',
            height: '38px',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: '2px',
              animation: 'scrollDot 2s infinite',
            }} />
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50%       { transform: translateX(-50%) translateY(-6px); }
          }
          @keyframes scrollDot {
            0%   { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(10px); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  )
}