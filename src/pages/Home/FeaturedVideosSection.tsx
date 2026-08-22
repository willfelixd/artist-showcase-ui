import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { videoService } from '../../services/videoService'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { VideoCarousel } from '../../components/ui/VideoCarousel'
import { VideoModal } from '../../pages/Videos/VideoModal'
import type { Video } from '../../types'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { BackToTopButton } from '../../components/ui/BackToTopButton'

export function FeaturedVideosSection() {
  const { t } = useTranslation()

  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    videoService
      .findFeatured()
      .then(page => setVideos(page.content))
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || videos.length === 0) return

    const element = sectionRef.current

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
  }, [loading, videos.length])

  if (loading) return <LoadingSpinner />
  if (videos.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="featured-videos"
      style={{
        padding: '80px 24px',
        background: 'transparent',
        transition: 'var(--transition-theme)',
      }}
    >
      <div
        className={`featured-videos-content ${isVisible ? 'featured-videos-visible' : ''
          }`}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Título */}
        <h2
          className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.0rem)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
          }}
        >
          {t('home.sections.featured_videos')}
        </h2>

        <VideoCarousel
          videos={videos}
          onVideoClick={setSelectedVideo}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '16px',
            position: 'absolute',
            right: 0,
          }}
        >
          <BackToTopButton />
        </div>
      </div>

      {/* Modal reutilizando VideoModal — X, título e dica já incluídos */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <style>{`
        .featured-videos-content {
          opacity: 0;
          transform: translateY(140px);
          filter: blur(10px);

          transition:
            opacity 1.7s ease,
            transform 1.7s cubic-bezier(0.25, 0.1, 0.25, 1),
            filter 1.7s ease;
        }

        .featured-videos-content.featured-videos-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .play-overlay {
          opacity: 0 !important;
        }

        div:hover > div > .play-overlay {
          opacity: 1 !important;
        }
      `}</style>

      <ScrollIndicator
        targetId="hero"
        direction="up"
        verticalOffset={15}
      />
    </section>
  )
}