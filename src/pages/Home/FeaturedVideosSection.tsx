import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { videoService } from '../../services/videoService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import type { Video } from '../../types'
import { VideoCarousel } from '../../components/ui/VideoCarousel'

export function FeaturedVideosSection() {
  const { t } = useTranslation()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  useEffect(() => {
    videoService.findFeatured()
      .then(page => setVideos(page.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (videos.length === 0) return null

  return (
    <section style={{
      padding: '80px 24px',
      background: 'transparent',
      transition: 'var(--transition-theme)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          marginBottom: '40px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          {t('home.sections.featured_videos')}
        </h2>

        <VideoCarousel
          videos={videos}
          onVideoClick={setSelectedVideo}
        />
      </div>

      {/* Modal do player */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '24px',
          }}
        >
          
          {/* Botão X — FORA do container do player */}
          <button
            onClick={e => {
              e.stopPropagation()
              setSelectedVideo(null)
            }}
            style={{
              position: 'fixed', // ← fixed em vez de absolute
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '22px',
              zIndex: 201, // ← acima do modal
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'
            }}
            aria-label="Fechar"
          >
            ✕
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={selectedVideo.embedUrl + '?autoplay=1'}
              title={selectedVideo.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style>{`
        .play-overlay { opacity: 0 !important; }
        div:hover > div > .play-overlay { opacity: 1 !important; }
      `}</style>

      {/* Indicador de scroll — voltar ao topo */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}>
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginTop: '48px',
            cursor: 'pointer',
            
            // 👇 IMPORTANTE
            animation: 'bounceUp 2s ease-in-out infinite',
            willChange: 'transform',
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <div style={{
            width: '24px',
            height: '38px',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingBottom: '8px',
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: '2px',
              animation: 'scrollDotUp 2s infinite',
            }} />
          </div>

          <span style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.5rem, 2vw, 0.5rem)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {t('home.sections.scroll_top')}
          </span>
        </div>
      </div>

      <style>{`
      @keyframes bounceUp {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }

      @keyframes scrollDotUp {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-10px); opacity: 0; }
      }
      `}</style>
    </section>
  )
}