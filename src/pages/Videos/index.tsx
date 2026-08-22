import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { videoService } from '../../services/videoService'
import { VideoCard } from './VideoCard'
import { VideoModal } from './VideoModal'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import type { Video } from '../../types'
import { VideoCarousel } from '../../components/ui/VideoCarousel'
import Pagination from '../../components/ui/Pagination'
import { BackToTopButton } from '../../components/ui/BackToTopButton'

export default function Videos() {
  const { t } = useTranslation()

  const [featured, setFeatured] = useState<Video[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const allVideosRef = useRef<HTMLDivElement>(null)

  const fetchVideos = (pageNum = 0) => {
    setLoading(true)
    setError(false)

    Promise.all([
      pageNum === 0 ? videoService.findFeatured() : Promise.resolve(null),
      videoService.findAll(pageNum, 12)
    ])
      .then(([featuredData, allData]) => {
        if (featuredData) setFeatured(featuredData.content)
        setVideos(allData.content)
        setTotalPages(allData.page.totalPages)
        setTotalElements(allData.page.totalElements)
        setPage(pageNum)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    if (page < 1) {
      allVideosRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [page])

  useEffect(() => {
    if (page > 0) {
      allVideosRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [page])

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>

      {/* Título */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.0rem)',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
          }}>
          {t('videos.title')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          marginTop: '12px',
          fontWeight: 500,
          textShadow: '0 2px 4px var(--shadow)',
          fontStyle: 'italic',
        }}>
          {totalElements > 0 && t('videos.available_count', { count: totalElements })}
        </p>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage
          message={t('common.error')}
          onRetry={() => fetchVideos(page)}
        />
      )}

      {!loading && !error && (
        <>
          {/* Vídeos em destaque */}
          {featured.length > 0 && (
            <section style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
                  fontWeight: 600,
                  textShadow: '0 2px 6px var(--shadow)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>⭐</span>

                <span className="text-gradient-section">
                  {t('videos.featured')}
                </span>
              </h2>
              <VideoCarousel
                videos={featured}
                onVideoClick={setSelectedVideo}
              />
            </section>
          )}

          {/* Divisor */}
          {featured.length > 0 && (
            <div style={{
              borderTop: '1px solid var(--border)',
              marginBottom: '40px',
            }} />
          )}

          {/* Todos os vídeos */}
          <section>
            <div ref={allVideosRef}>
              <h2 className="text-gradient-section"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
                  fontWeight: 600,
                  textShadow: '0 2px 6px var(--shadow)',
                  marginBottom: '24px',
                }}>
                {t('videos.all_videos')}
              </h2>
            </div>

            {videos.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                textShadow: '0 2px 4px var(--shadow)',
              }}>
                {t('videos.no_videos')}
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px',
                  marginBottom: '40px',
                }}>
                  {videos.map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onClick={setSelectedVideo}
                    />
                  ))}
                </div>

                {/* Paginação */}
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={fetchVideos}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <BackToTopButton />
                  </div>
                </div>

              </>
            )}
          </section>
        </>
      )}

      {/* Modal do player */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  )
}