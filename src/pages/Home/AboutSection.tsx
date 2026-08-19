import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Artist } from '../../types'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'

interface AboutSectionProps {
  artist: Artist
}

export function AboutSection({ artist }: AboutSectionProps) {
  const { t } = useTranslation()

  // Substitua pelo ID real do vídeo de apresentação da Isa
  const presentationVideoId = 'j6ocHIEMarE'

  const aboutRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = aboutRef.current

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
  }, [])

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        padding: '80px 24px',
        background: 'var(--bg-background-about)',
        transition: 'var(--transition-theme)',
      }}>
      {/* LINHA VISUAL */}
      <div className="stage-line" />

      <div ref={aboutRef} style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
      }}
        className={`about-grid ${isVisible ? 'about-visible' : ''}`}
      >
        {/* Mini player YouTube — autoplay com áudio */}
        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          aspectRatio: '16/9',
          border: '1px solid var(--border)',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${presentationVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
            title={`${artist.name} — Apresentação`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Bio / Sobre mim */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <div>
            <h1 className="text-gradient-section"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
                marginBottom: '12px',
                textShadow: '0 2px 6px var(--shadow)',
              }}>
              {t('home.sections.about.label')}
            </h1>
            <p style={{
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              textAlign: 'justify',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: '1.8',
              fontWeight: 500,
              whiteSpace: 'pre-line',
              textShadow: '0 2px 4px var(--shadow)',
            }}>
              {t('home.sections.about.bio')}
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* LINHA VISUAL */}
      <div className="stage-line" />

      <ScrollIndicator targetId="most-requested" direction="down" />

      <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50%       { transform: translateX(-50%) translateY(-6px); }
          }
          @keyframes scrollDot {
            0%   { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(10px); opacity: 0; }
          }
        `}</style>
    </section>
  )
}