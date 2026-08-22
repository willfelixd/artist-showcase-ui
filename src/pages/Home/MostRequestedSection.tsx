import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { songService } from '../../services/songService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { SongModal } from '../../pages/Repertoire/SongModal'
import type { Song } from '../../types'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { AudioModal } from '../Repertoire/AudioModal'
import { SongCard } from '../../pages/Repertoire/SongCard'

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
          {songs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
              showIndex
              onAudioClick={setSelectedSongAudio}
            />
          ))}
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