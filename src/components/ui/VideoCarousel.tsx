import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { Video } from '../../types'

interface VideoCarouselProps {
  videos: Video[]
  onVideoClick: (video: Video) => void
}

export function VideoCarousel({ videos, onVideoClick }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setCurrent(i => (i === 0 ? videos.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === videos.length - 1 ? 0 : i + 1))

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  if (videos.length === 0) return null

  const video = videos[current]

  return (
    <div style={{ 
      position: 'relative', 
      maxWidth: 'clamp(320px, 80vw, 700px)', // 👈 adapta bem entre mobile e desktop
      margin: '0 auto',  // 👈 centraliza
      }}>

      {/* Card principal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          cursor: 'pointer',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={() => onVideoClick(video)}
        onMouseEnter={e => {
          const overlay = e.currentTarget.querySelector('.carousel-overlay') as HTMLDivElement
          if (overlay) overlay.style.opacity = '1'
        }}
        onMouseLeave={e => {
          const overlay = e.currentTarget.querySelector('.carousel-overlay') as HTMLDivElement
          if (overlay) overlay.style.opacity = '0'
        }}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />

        {/* Overlay com play */}
        <div
          className="carousel-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            <Play size={28} color="white" fill="white" style={{ marginLeft: '3px' }} />
          </div>
        </div>

        {/* Título e gradiente no fundo */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}>
          <p style={{
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            fontWeight: '400',
          }}>
            {video.title}
          </p>
        </div>
      </div>

      {/* Seta esquerda */}
      {videos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow)',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = 'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor = 'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = 'var(--bg-card)'
            el.style.color = 'var(--text-primary)'
            el.style.borderColor = 'var(--border)'
          }}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Seta direita */}
      {videos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next() }}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow)',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = 'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor = 'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = 'var(--bg-card)'
            el.style.color = 'var(--text-primary)'
            el.style.borderColor = 'var(--border)'
          }}
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Bolinhas de navegação */}
      {videos.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '20px',
        }}>
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === current
                  ? 'var(--accent-primary)'
                  : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Vídeo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}