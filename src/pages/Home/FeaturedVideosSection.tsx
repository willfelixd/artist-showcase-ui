import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play } from 'lucide-react'
import { videoService } from '../../services/videoService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
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
      transition: 'var(--transition-theme)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          marginBottom: '40px',
          textAlign: 'center',
          fontWeight: '400',
        }}>
          {t('home.sections.featured_videos')}
        </h2>

        {/* Grid de vídeos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {videos.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                backgroundColor: 'var(--bg-primary)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative' }}>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                }}
                  className="play-overlay"
                >
                  <Play size={48} color="white" fill="white" />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                }}>
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
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
    </section>
  )
}