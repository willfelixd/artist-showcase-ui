import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { videoService } from '../../services/videoService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { VideoCarousel } from '../../components/ui/VideoCarousel'
import { VideoModal } from '../../pages/Videos/VideoModal'
import type { Video } from '../../types'

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

      {/* Modal reutilizando VideoModal — X, título e dica já incluídos */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
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
            animation: 'bounceUp 2s ease-in-out infinite',
            willChange: 'transform',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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