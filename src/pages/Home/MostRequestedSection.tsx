import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, Music2, Headphones } from 'lucide-react'
import { songService } from '../../services/songService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { SongModal } from '../../pages/Repertoire/SongModal'
import type { Song } from '../../types'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { AudioModal } from '../Repertoire/AudioModal'

export function MostRequestedSection() {
  const { t } = useTranslation()

  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSongLyrics, setSelectedSongLyrics] = useState<Song | null>(null)
  const [selectedSongAudio, setSelectedSongAudio] = useState<Song | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    songService
      .findMostRequested()
      .then(page => setSongs(page.content))
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || songs.length === 0) return

    const element = sectionRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [loading, songs.length])

  if (loading) return <LoadingSpinner />
  if (songs.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="most-requested"
      style={{
        padding: '80px 24px',
        position: 'relative',
        background: 'transparent',
        transition: 'var(--transition-theme)',
      }}
    >
      <div
        className={`most-requested-content ${isVisible ? 'most-requested-visible' : ''
          }`}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Título */}
        <h2
          className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.0rem)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
          }}
        >
          {t('home.sections.mostRequested')}
        </h2>

        {/* Grid de músicas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {songs.map((song, index) => {
            const hasLyrics = Boolean(song.lyrics?.trim())
            const hasAudio = Boolean(song.audioUrl?.trim())

            return (
              <div
                key={song.id}
                className="card-glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  transition:
                    'transform 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  ; (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(-4px)'
                    ; (e.currentTarget as HTMLDivElement).style.borderColor =
                      'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  ; (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(0)'
                    ; (e.currentTarget as HTMLDivElement).style.borderColor =
                      'var(--border)'
                }}
              >
                {/* Número */}
                <span
                  className="text-gradient-number"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    minWidth: '32px',
                    fontWeight: '300',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <Music2 size={18} color="var(--text-muted)" />

                {/* Info */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: '500',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '4px',
                      textShadow: '0 2px 4px var(--shadow)',
                    }}
                  >
                    {song.title}
                  </p>

                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      marginBottom: hasLyrics ? '8px' : '0',
                      textShadow: '0 2px 4px var(--shadow)',
                    }}
                  >
                    {song.genre}
                  </p>

                  {/* Botões lado a lado */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>

                    {/* Botão para visualizar a letra */}
                    {hasLyrics && (
                      <button
                        type="button"
                        onClick={() => setSelectedSongLyrics(song)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 10px',
                          background: 'transparent',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition:
                            'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          const button = e.currentTarget

                          button.style.color = 'var(--accent-primary)'
                          button.style.borderColor = 'var(--accent-primary)'
                          button.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                          const button = e.currentTarget

                          button.style.color = 'var(--text-muted)'
                          button.style.borderColor = 'var(--border)'
                          button.style.transform = 'translateY(0)'
                        }}
                      >
                        <FileText size={14} />
                        Ver letra
                      </button>
                    )}

                    {/* Botão Ouvir */}
                    {hasAudio && (
                      <button
                        type="button"
                        onClick={() => setSelectedSongAudio(song)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 10px',
                          background: 'transparent',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          const btn = e.currentTarget
                          btn.style.color = 'var(--accent-primary)'
                          btn.style.borderColor = 'var(--accent-primary)'
                          btn.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                          const btn = e.currentTarget
                          btn.style.color = 'var(--text-muted)'
                          btn.style.borderColor = 'var(--border)'
                          btn.style.transform = 'translateY(0)'
                        }}
                      >
                        <Headphones size={14} />
                        Ouvir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <ScrollIndicator
          targetId="featured-videos"
          direction="down"
          verticalOffset={160}
        />

        {/* Modal da letra */}
        {selectedSongLyrics && selectedSongLyrics.lyrics && (
          <SongModal
            title={selectedSongLyrics.title}
            lyrics={selectedSongLyrics.lyrics}
            onClose={() => setSelectedSongLyrics(null)}
          />
        )}

        {/* Modal de áudio */}
        {selectedSongAudio && (
          <AudioModal
            song={selectedSongAudio}
            onClose={() => setSelectedSongAudio(null)}
          />
        )}

        <style>{`
          .most-requested-content {
            opacity: 0;
            transform: translateY(140px);
            filter: blur(10px);

            transition:
              opacity 1.7s ease,
              transform 1.7s cubic-bezier(0.25, 0.1, 0.25, 1),
              filter 1.7s ease;
          }

          .most-requested-content.most-requested-visible {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }

            50% {
              transform: translateX(-50%) translateY(-6px);
            }
          }

          @keyframes scrollDot {
            0% {
              transform: translateY(0);
              opacity: 1;
            }

            100% {
              transform: translateY(10px);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </section>
  )
}