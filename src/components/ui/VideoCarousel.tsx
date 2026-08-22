import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { Video } from '../../types'
import { useTranslation } from 'react-i18next'

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
  const [isHovered, setIsHovered] = useState(false)

  const { t } = useTranslation()

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

  /*
   * Mouse sobre o carousel
   */
  const handleMouseEnter = () => {
    clearResumeTimeout()
    setIsPaused(true)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPaused(false)
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          aspectRatio: '16 / 9',
          cursor: 'pointer',
          border: `1px solid ${isHovered
              ? 'var(--accent-primary)'
              : 'var(--border)'
            }`,
          boxShadow: isHovered
            ? '0 20px 60px var(--shadow)'
            : '0 20px 60px rgba(0,0,0,0.3)',
          transform: isHovered
            ? 'translateY(-4px)'
            : 'translateY(0)',
          transition:
            'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Iluminação premium */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '190px',
            height: '190px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, var(--accent-primary), transparent 70%)',
            opacity: isHovered ? 0.08 : 0.045,
            filter: 'blur(28px)',
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Thumbnail */}
        <img
          key={video.id}
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: isHovered
              ? 'scale(1.045)'
              : 'scale(1)',
            transition:
              'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
            animation:
              'carouselFade 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.14) 52%, transparent 100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Play premium */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: isHovered
                ? '0 0 0 8px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.35)'
                : '0 4px 20px rgba(0,0,0,0.3)',
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? 'scale(1)'
                : 'scale(0.82)',
              transition:
                'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Play
              size={28}
              color="white"
              fill="white"
              style={{
                display: 'block',
                marginLeft: '3px',
              }}
            />
          </div>
        </div>

        {/* Badge em destaque */}
        {video.featured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 9px',
              borderRadius: '999px',
              background: 'var(--pink-gradient)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--color-marfim)',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px var(--shadow)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(8px)',
              zIndex: 5,
            }}
          >
            ★ {t('common.emphasis')}
          </div>
        )}

        {/* Título */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
            zIndex: 3,
          }}
        >
          <p
            title={video.title}
            style={{
              color: 'white',
              fontFamily: 'var(--font-display)',
              fontSize:
                'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 400,
              lineHeight: 1.35,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            }}
          >
            {video.title}
          </p>
        </div>
      </div>

      {/* Seta esquerda */}
      {videos.length > 1 && (
        <button
          type="button"
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
            transition:
              'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget

            el.style.backgroundColor =
              'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor =
              'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget

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
          type="button"
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
            transition:
              'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget

            el.style.backgroundColor =
              'var(--accent-primary)'
            el.style.color = 'white'
            el.style.borderColor =
              'var(--accent-primary)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget

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
              type="button"
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

      {/* Animações */}
      <style>{`
        @keyframes carouselFade {
          0% {
            opacity: 0;
            transform: scale(1.02);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}