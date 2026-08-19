import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ScrollIndicatorProps {
  targetId: string
  direction?: 'down' | 'up'
  verticalOffset?: number
}

export function ScrollIndicator({
  targetId,
  direction = 'down',
  verticalOffset = 0,
}: ScrollIndicatorProps) {
  const { t } = useTranslation()
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')

    const handleResize = () => {
      setIsDesktop(media.matches)
    }

    handleResize()

    media.addEventListener('change', handleResize)

    return () => {
      media.removeEventListener('change', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setIsVisible(false)
      return
    }

    const element = indicatorRef.current

    if (!element) return

    const section = element.closest('section')

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.5,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [isDesktop])

  const handleClick = () => {
    const target = document.getElementById(targetId)

    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (!isDesktop) return null

  const isUp = direction === 'up'

  return (
    <div
      ref={indicatorRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={
        isUp
          ? t('home.sections.scroll_top')
          : t('home.sections.scroll_hint')
      }
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleClick()
        }
      }}
      style={{
        position: 'absolute',
        left: '50%',
        bottom: isUp
          ? `${24 - verticalOffset}px`
          : `${24 - verticalOffset}px`,
        transform: isVisible
          ? 'translateX(-50%) translateY(0)'
          : `translateX(-50%) translateY(${isUp ? '10px' : '-10px'})`,
        display: 'flex',
        flexDirection: isUp ? 'column-reverse' : 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition:
          'opacity .5s ease, transform .5s ease',
        zIndex: 10,
        animation: isVisible
          ? 'scrollIndicatorBounce 2s ease-in-out infinite'
          : 'none',
      }}
    >
      <span
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.5rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px var(--shadow)',
          whiteSpace: 'nowrap',
        }}
      >
        {isUp
          ? t('home.sections.scroll_top')
          : t('home.sections.scroll_hint')}
      </span>

      <div
        style={{
          width: '24px',
          height: '38px',
          border: '2px solid var(--border)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: isUp ? 'flex-end' : 'flex-start',
          paddingTop: isUp ? '0' : '8px',
          paddingBottom: isUp ? '8px' : '0',
          boxSizing: 'border-box',
          transition: 'border-color .3s ease',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '8px',
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '2px',
            animation: isUp
              ? 'scrollDotUp 2s infinite'
              : 'scrollDot 2s infinite',
          }}
        />
      </div>

      <style>
        {`
          @keyframes scrollIndicatorBounce {
            0%, 100% {
              margin-bottom: 0;
            }

            50% {
              margin-bottom: -6px;
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

          @keyframes scrollDotUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }

            100% {
              transform: translateY(-10px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}