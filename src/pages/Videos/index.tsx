import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { videoService } from '../../services/videoService'
import { VideoCard } from './VideoCard'
import { VideoModal } from './VideoModal'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import type { Video } from '../../types'

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
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--text-primary)',
          fontWeight: '400',
        }}>
          {t('videos.title')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          marginTop: '12px',
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
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: 'var(--text-primary)',
                fontWeight: '400',
                marginBottom: '24px',
              }}>
                ⭐ {t('videos.featured')}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}>
                {featured.map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={setSelectedVideo}
                  />
                ))}
              </div>
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
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: 'var(--text-primary)',
                fontWeight: '400',
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
                {totalPages > 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}>
                    <button
                      onClick={() => fetchVideos(page - 1)}
                      disabled={page === 0}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        cursor: page === 0 ? 'not-allowed' : 'pointer',
                        color: page === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                      }}
                    >
                      ← Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => fetchVideos(i)}
                        style={{
                          padding: '8px 14px',
                          backgroundColor: i === page ? 'var(--accent-primary)' : 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: i === page ? 'var(--color-marfim)' : 'var(--text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: i === page ? '600' : '400',
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => fetchVideos(page + 1)}
                      disabled={page === totalPages - 1}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                        color: page === totalPages - 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                      }}
                    >
                      Próxima →
                    </button>
                  </div>
                )}
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