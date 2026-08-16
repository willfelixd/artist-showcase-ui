import { useState } from 'react'
import { FileText, Music2, Star } from 'lucide-react'
import type { Song } from '../../types'
import { SongModal } from './SongModal'

interface SongCardProps {
  song: Song
  index?: number
  showIndex?: boolean
}

export function SongCard({ song, index, showIndex = false }: SongCardProps) {
  const [showLyrics, setShowLyrics] = useState(false)

  const hasLyrics = Boolean(song.lyrics?.trim())

  return (
    <>
      <div
        className="card-glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={e => {
          ; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
            ; (e.currentTarget as HTMLDivElement).style.borderColor =
              'var(--accent-primary)'
        }}
        onMouseLeave={e => {
          ; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
            ; (e.currentTarget as HTMLDivElement).style.borderColor =
              'var(--border)'
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

          {/* Botão para visualizar a letra */}
          {hasLyrics && (
            <button
              type="button"
              onClick={() => setShowLyrics(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '10px',
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