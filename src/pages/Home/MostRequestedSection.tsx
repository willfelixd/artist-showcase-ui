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
      backgroundColor: 'var(--bg-secondary)',
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
          fontWeight: '400',
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: 'var(--shadow)',
                transition: 'var(--transition-theme)',
              }}
            >
              {/* Número */}
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--accent-primary)',
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
      </div>
    </section>
  )
}