import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { songService } from '../../services/songService'
import { useDebounce } from '../../hooks/useDebounce'
import { SongCard } from './SongCard'
import { SongFilters } from './SongFilters'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import type { Song } from '../../types'

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

  // Busca músicas mais pedidas (só uma vez)
  useEffect(() => {
    songService.findMostRequested()
      .then(data => setMostRequested(data.content))
      .catch(() => {})
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
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--text-primary)',
          fontWeight: '400',
          marginBottom: '12px',
        }}>
          {t('repertoire.title')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
        }}>
          {totalElements > 0 && `${totalElements} músicas disponíveis`}
        </p>
      </div>

      {/* Seção mais pedidas */}
      {mostRequested.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--text-primary)',
            fontWeight: '400',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            ⭐ {t('repertoire.most_requested')}
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
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          color: 'var(--text-primary)',
          fontWeight: '400',
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
              <SongCard key={song.id} song={song} />
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
                  onClick={() => handlePageChange(i)}
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
                onClick={() => handlePageChange(page + 1)}
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
    </main>
  )
}