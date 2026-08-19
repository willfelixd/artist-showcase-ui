import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { songService } from '../../services/songService'
import { useDebounce } from '../../hooks/useDebounce'
import { SongCard } from './SongCard'
import { SongFilters } from './SongFilters'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import type { Song } from '../../types'
import { AudioModal } from './AudioModal'

const GENRES = [
  'MPB', 'Sertanejo', 'Pop', 'Bossa Nova', 'Samba',
  'Forró', 'Pagode', 'Rock', 'Gospel', 'Acústico'
]

export default function Repertoire() {
  const { t } = useTranslation()

  // Estados dos filtros
  const [titleInput, setTitleInput] = useState('')
  const [genre, setGenre] = useState('')
  const debouncedTitle = useDebounce(titleInput, 500)

  // Estados dos dados
  const [songs, setSongs] = useState<Song[]>([])
  const [mostRequested, setMostRequested] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // Ref para a seção do repertório completo
  const repertoireRef = useRef<HTMLDivElement>(null)

  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  // Busca músicas mais pedidas (só uma vez)
  useEffect(() => {
    songService.findMostRequested()
      .then(data => setMostRequested(data.content))
      .catch(() => { })
  }, [])

  // Busca músicas com filtros — reage ao debounce e ao gênero
  useEffect(() => {
    setLoading(true)
    setError(false)
    setPage(0)

    songService.findAll({ title: debouncedTitle, genre, page: 0, size: 12 })
      .then(data => {
        setSongs(data.content)
        setTotalPages(data.page.totalPages)
        setTotalElements(data.page.totalElements)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [debouncedTitle, genre])

  // Busca ao mudar de página
  const handlePageChange = (newPage: number) => {
    setLoading(true)
    songService.findAll({ title: debouncedTitle, genre, page: newPage, size: 12 })
      .then(data => {
        setSongs(data.content)
        setPage(newPage)
        // Rola suavemente até o início da seção de repertório
        repertoireRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  const handleClearFilters = () => {
    setTitleInput('')
    setGenre('')
  }

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>

      {/* Título da página */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.0rem)',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
            marginBottom: '12px',
          }}>
          {t('repertoire.title')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          textShadow: '0 2px 4px var(--shadow)',
          fontStyle: 'italic',
        }}>
          {totalElements > 0 && t('repertoire.available_count', { count: totalElements })}
        </p>
      </div>

      {/* Seção mais pedidas */}
      {mostRequested.length > 0 && (
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
              {t('repertoire.most_requested')}
            </span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}>
            {mostRequested.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                showIndex
                onAudioClick={setSelectedSong}
              />
            ))}
          </div>
        </section>
      )}

      {/* Divisor */}
      <div style={{
        borderTop: '1px solid var(--border)',
        marginBottom: '32px',
      }} />

      {/* Ref aqui — marca o ponto de scroll */}
      <div ref={repertoireRef}>
        <h2 className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
            marginBottom: '24px',
          }}>
          {t('repertoire.full_repertoire')}
        </h2>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: '32px' }}>
        <SongFilters
          title={titleInput}
          genre={genre}
          genres={GENRES}
          onTitleChange={setTitleInput}
          onGenreChange={setGenre}
          onClear={handleClearFilters}
        />
      </div>

      {/* Estados de loading/erro/vazio */}
      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage
          message={t('common.error')}
          onRetry={() => {
            setError(false)
            setLoading(true)
            songService.findAll({ title: debouncedTitle, genre, page, size: 12 })
              .then(data => {
                setSongs(data.content)
                setTotalPages(data.page.totalPages)
                setTotalElements(data.page.totalElements)
              })
              .catch(() => setError(true))
              .finally(() => setLoading(false))
          }}
        />
      )}

      {!loading && !error && songs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          textShadow: '0 2px 4px var(--shadow)',
        }}>
          {t('repertoire.no_results')}
        </div>
      )}

      {/* Grid de músicas */}
      {!loading && !error && songs.length > 0 && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
            marginBottom: '40px',
          }}>
            {songs.map(song => (
              <SongCard key={song.id} song={song} onAudioClick={setSelectedSong} />
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
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                style={{
                  padding: '8px 16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: page === 0 ? 'not-allowed' : 'pointer',
                  color: page === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px var(--shadow)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)',
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)',
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-primary)'
                }}
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  style={{
                    padding: '8px 14px',
                    background: i === page ? 'var(--pink-gradient)' : 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: i === page ? 'var(--color-marfim)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: i === page ? '600' : '400',
                    transition: 'all 0.3s ease',
                    textShadow: '0 2px 4px var(--shadow)',
                  }}

                  // Página atual
                  onMouseEnter={i === page ? (e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, color-mix(in srgb, var(--accent-hover) 85%, white) 0%, var(--accent-hover) 100%)'
                  } : (e) => {
                    e.currentTarget.style.color = 'var(--accent-primary)'
                    e.currentTarget.style.background = 'var(--bg-secondary)'
                  }
                  }
                  onMouseLeave={i === page ? (e) => {
                    e.currentTarget.style.color = 'var(--color-marfim)'
                    e.currentTarget.style.background = 'var(--pink-gradient)'
                  } : (e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'var(--bg-primary)'
                  }
                  }
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
                style={{
                  padding: '8px 16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                  color: page === totalPages - 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px var(--shadow)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)',
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)',
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-primary)'
                }}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )
      }
      {/* Modal de áudio */}
      {selectedSong && (
        <AudioModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </main >
  )
}