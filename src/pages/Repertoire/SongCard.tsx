import { useState } from 'react'
import { FileText, Music2, Star, Headphones } from 'lucide-react'
import type { Song } from '../../types'
import { SongModal } from './SongModal'

interface SongCardProps {
  song: Song
  index?: number
  showIndex?: boolean
  onAudioClick?: (song: Song) => void
}

export function SongCard({
  song,
  index,
  showIndex = false,
  onAudioClick,
}: SongCardProps) {
  const [showLyrics, setShowLyrics] = useState(false)

  const hasLyrics = Boolean(song.lyrics?.trim())
  const hasAudio = Boolean(song.audioUrl?.trim())

  return (
    <>
      <div
        className="card-glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          transition:
            'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement

          el.style.transform = 'translateY(-2px)'
          el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
          el.style.borderColor = 'var(--accent-primary)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement

          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'var(--shadow)'
          el.style.borderColor = 'var(--border)'
        }}
      >
        {/* Número ou ícone */}
        {showIndex && index !== undefined ? (
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
        ) : (
          <Music2
            size={18}
            color="var(--text-muted)"
            style={{ minWidth: '18px' }}
          />
        )}

        {/* Info da música */}
        <div style={{ flex: 1, minWidth: 0 }}>
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

          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                textShadow: '0 2px 4px var(--shadow)',
              }}
            >
              {song.artist}
            </span>

            <span style={{ color: 'var(--border)' }}>•</span>

            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '2px 8px',
                borderRadius: '12px',
                textShadow: '0 2px 4px var(--shadow)',
              }}
            >
              {song.genre}
            </span>
          </div>

          {/* Ações */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '10px',
            }}
          >

            {/* Botão para visualizar a letra */}
            {hasLyrics && (
              <button
                type="button"
                onClick={() => setShowLyrics(true)}
                aria-label={`Ver letra de ${song.title}`}
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
            {/* Botão de áudio */}
            {hasAudio && (
              <button
                type="button"
                onClick={() => onAudioClick?.(song)}
                aria-label={`Ouvir ${song.title}`}
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

        {/* Badge mais pedida */}
        {song.mostRequested && (
          <Star
            size={16}
            color="var(--accent-primary)"
            fill="var(--accent-primary)"
            style={{ minWidth: '16px' }}
          />
        )}
      </div>

      {/* Modal da letra */}
      {showLyrics && song.lyrics && (
        <SongModal
          title={song.title}
          lyrics={song.lyrics}
          onClose={() => setShowLyrics(false)}
        />
      )}
    </>
  )
}