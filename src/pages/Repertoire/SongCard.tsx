import { Music2, Star } from 'lucide-react'
import type { Song } from '../../types'

interface SongCardProps {
  song: Song
  index?: number
  showIndex?: boolean
}

export function SongCard({ song, index, showIndex = false }: SongCardProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: 'var(--shadow)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Número ou ícone */}
      {showIndex && index !== undefined ? (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: 'var(--accent-primary)',
          minWidth: '32px',
          fontWeight: '300',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      ) : (
        <Music2 size={18} color="var(--text-muted)" style={{ minWidth: '18px' }} />
      )}

      {/* Info da música */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: 'var(--text-primary)',
          fontWeight: '500',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginBottom: '4px',
        }}>
          {song.title}
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
          }}>
            {song.artist}
          </span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '2px 8px',
            borderRadius: '12px',
          }}>
            {song.genre}
          </span>
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
  )
}