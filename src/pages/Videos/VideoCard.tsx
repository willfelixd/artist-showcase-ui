import { Play } from 'lucide-react'
import type { Video } from '../../types'

interface VideoCardProps {
  video: Video
  onClick: (video: Video) => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      onClick={() => onClick(video)}
      style={{
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        backgroundColor: 'var(--bg-card)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'
        const overlay = el.querySelector('.play-overlay') as HTMLDivElement
        if (overlay) overlay.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'var(--shadow)'
        const overlay = el.querySelector('.play-overlay') as HTMLDivElement
        if (overlay) overlay.style.opacity = '0'
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Overlay com botão play */}
        <div
          className="play-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Play size={24} color="white" fill="white" style={{ marginLeft: '3px' }} />
          </div>
        </div>

        {/* Badge em destaque */}
        {video.featured && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--color-marfim)',
            fontSize: '11px',
            fontWeight: '600',
            padding: '3px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            ★ Destaque
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <p style={{
          color: 'var(--text-primary)',
          fontWeight: '500',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {video.title}
        </p>
        {video.description && (
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            marginTop: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {video.description}
          </p>
        )}
      </div>
    </div>
  )
}