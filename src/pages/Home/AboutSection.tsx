import { useTranslation } from 'react-i18next'
import type { Artist } from '../../types'

interface AboutSectionProps {
  artist: Artist
}

export function AboutSection({ artist }: AboutSectionProps) {
  const { t } = useTranslation()

  // Substitua pelo ID real do vídeo de apresentação da Isa
  const presentationVideoId = 'j6ocHIEMarE'

  return (
    <section style={{
      minHeight: 'calc(100vh - 64px)',
      padding: '80px 24px',
      background: 'var(--bg-background-about)',
      transition: 'var(--transition-theme)',
    }}>
      {/* LINHA VISUAL */}
      <div className="stage-line" />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
      }}
        className="about-grid"
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
            <h1 style={{
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              {t('home.sections.about.label')}
            </h1>
            <p style={{
              color: 'var(--text-primary)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'justify',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: '1.8',
              whiteSpace: 'pre-line',
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
      
      {/* Indicador de scroll */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s infinite',
          cursor: 'pointer',
        }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
          }}
        >
          <span style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.5rem, 2vw, 0.5rem)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {t('home.sections.scroll_hint')}
          </span>
          <div style={{
            width: '24px',
            height: '38px',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: '2px',
              animation: 'scrollDot 2s infinite',
            }} />
          </div>
        </div>

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