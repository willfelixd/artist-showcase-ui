import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { Video } from '../../types'

interface VideoCarouselProps {
  videos: Video[]
  onVideoClick: (video: Video) => void
}

export function VideoCarousel({
  videos,
  onVideoClick,
}: VideoCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const touchStartX = useRef<number | null>(null)
  const resumeTimeoutRef = useRef<number | null>(null)

  /*
   * Tempo do autoplay
   * Desktop: 5 segundos
   * Mobile: 4 segundos
   */
  const isMobile = window.innerWidth < 768
  const autoplayDelay = isMobile ? 4000 : 5000

  /*
   * Limpa o timeout de retomada do autoplay
   */
  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  /*
   * Agenda a retomada do autoplay
   * depois de uma interação manual.
   */
  const scheduleResume = () => {
    clearResumeTimeout()

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false)
    }, 1500)
  }

  /*
   * Avança para o vídeo anterior
   */
  const prev = () => {
    setCurrent(i =>
      i === 0 ? videos.length - 1 : i - 1
    )
  }

  /*
   * Avança para o próximo vídeo
   */
  const next = () => {
    setCurrent(i =>
      i === videos.length - 1 ? 0 : i + 1
    )
  }

  /*
   * Autoplay
   */
  useEffect(() => {
    if (videos.length <= 1 || isPaused) return

    const interval = window.setInterval(() => {
      setCurrent(i =>
        i === videos.length - 1 ? 0 : i + 1
      )
    }, autoplayDelay)

    return () => {
      window.clearInterval(interval)
    }
  }, [
    videos.length,
    isPaused,
    autoplayDelay,
  ])

  /*
   * Limpa o timeout quando o componente desmontar
   */
  useEffect(() => {
    return () => {
      clearResumeTimeout()
    }
  }, [])

  /*
   * Garante que o índice continue válido
   * caso a lista de vídeos seja alterada.
   */
  useEffect(() => {
    if (current >= videos.length) {
      setCurrent(0)
    }
  }, [videos.length, current])

  /*
   * Touch / Swipe
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    clearResumeTimeout()

    setIsPaused(true)

    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) {
      scheduleResume()
      return
    }

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }

    touchStartX.current = null

    scheduleResume()
  }

  /*
   * Clique nas bolinhas
   */
  const handleDotClick = (index: number) => {
    clearResumeTimeout()

    setCurrent(index)
    setIsPaused(true)

    scheduleResume()
  }

  if (videos.length === 0) return null

  const video = videos[current]

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: 'clamp(320px, 80vw, 540px)',
        margin: '0 auto',
      }}
      onMouseEnter={() => {
        clearResumeTimeout()
        setIsPaused(true)
      }}
      onMouseLeave={() => {
        setIsPaused(false)
      }}
    >

      {/* Card principal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => onVideoClick(video)}
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          cursor: 'pointer',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          const overlay = e.currentTarget.querySelector(
            '.carousel-overlay'
          ) as HTMLDivElement

          if (overlay) {
            overlay.style.opacity = '1'
          }
        }}
        onMouseLeave={e => {
          const overlay = e.currentTarget.querySelector(
            '.carousel-overlay'
          ) as HTMLDivElement

          if (overlay) {
            overlay.style.opacity = '0'
          }
        }}
      >

        {/* Thumbnail com transição suave */}
        <img
          key={video.id}
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            animation:
              'carouselFade 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Overlay com play */}
        <div
          className="carousel-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <Play
              size={28}
              color="white"
              fill="white"
              style={{
                marginLeft: '3px',
              }}
            />
          </div>
        </div>

        {/* Título */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }}
        >
          <p
            style={{
              color: 'white',
              fontFamily: 'var(--font-display)',
              fontSize:
                'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: '400',
              margin: 0,
            }}
          >
            {video.title}
          </p>
        </div>
      </div>

      {/* Seta esquerda */}
      {videos.length > 1 && (
        <button
          onClick={e => {
            e.stopPropagation()

            clearResumeTimeout()
            prev()
            setIsPaused(true)
            scheduleResume()
          }}
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
            const el =
              e.currentTarget as HTMLButtonElement

            el.style.backgroundColor =
              'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor =
              'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el =
              e.currentTarget as HTMLButtonElement

            el.style.backgroundColor =
              'var(--bg-card)'
            el.style.color =
              'var(--text-primary)'
            el.style.borderColor =
              'var(--border)'
          }}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Seta direita */}
      {videos.length > 1 && (
        <button
          onClick={e => {
            e.stopPropagation()

            clearResumeTimeout()
            next()
            setIsPaused(true)
            scheduleResume()
          }}
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
            const el =
              e.currentTarget as HTMLButtonElement

            el.style.backgroundColor =
              'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor =
              'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el =
              e.currentTarget as HTMLButtonElement

            el.style.backgroundColor =
              'var(--bg-card)'
            el.style.color =
              'var(--text-primary)'
            el.style.borderColor =
              'var(--border)'
          }}
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Bolinhas */}
      {videos.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
          }}
        >
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={e => {
                e.stopPropagation()
                handleDotClick(i)
              }}
              style={{
                width:
                  i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor:
                  i === current
                    ? 'var(--accent-primary)'
                    : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                transition:
                  'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Vídeo ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Animação de troca */}
      <style>{`
        @keyframes carouselSlideIn {
          0% {
            opacity: 0;
            transform: translateX(35px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}