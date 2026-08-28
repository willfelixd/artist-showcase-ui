import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react'
import { songService } from '../../../services/songService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import Pagination from '../../../components/ui/Pagination'
import { BackToTopButton } from '../../../components/ui/BackToTopButton'
import type { Song } from '../../../types'

interface SongForm {
  title: string
  artist: string
  genre: string
  youtubeUrl: string
  lyrics: string
  audioUrl: string
  mostRequested: boolean
}

const emptyForm: SongForm = {
  title: '',
  artist: '',
  genre: '',
  youtubeUrl: '',
  lyrics: '',
  audioUrl: '',
  mostRequested: false,
}

const PAGE_SIZE = 10

const inputStyle = {
  padding: '8px 12px',
  backgroundColor: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: '500',
  textShadow: '0 2px 4px var(--shadow)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
}

export default function SongsPage() {
  const { t } = useTranslation()

  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<SongForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchSongs = (pageNumber = 0) => {
    setLoading(true)

    songService
      .findAll({
        page: pageNumber,
        size: PAGE_SIZE,
      })
      .then(data => {
        setSongs(data.content)
        setPage(pageNumber)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSongs(0)
  }, [])

  const handlePageChange = (newPage: number) => {
    fetchSongs(newPage)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleEdit = async (song: Song) => {
    try {
      const fullSong = await songService.findById(song.id)

      setEditingId(song.id)

      setForm({
        title: fullSong.title,
        artist: fullSong.artist,
        genre: fullSong.genre,
        youtubeUrl: fullSong.youtubeUrl || '',
        lyrics: fullSong.lyrics || '',
        audioUrl: fullSong.audioUrl || '',
        mostRequested: fullSong.mostRequested,
      })

      setShowForm(true)
    } catch {
      alert('Erro ao carregar música')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('admin.actions.confirm_delete'))) return

    try {
      await songService.delete(id)

      /*
       * Remove localmente para evitar uma nova requisição
       * desnecessária. Caso a página fique vazia após a
       * exclusão, recarrega a página anterior.
       */
      setSongs(prev => {
        const updated = prev.filter(song => song.id !== id)

        if (updated.length === 0 && page > 0) {
          fetchSongs(page - 1)
        }

        return updated
      })
    } catch {
      alert('Erro ao deletar música')
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.artist || !form.genre) return

    setSaving(true)

    try {
      if (editingId) {
        const updated = await songService.update(editingId, form)

        setSongs(prev =>
          prev.map(song =>
            song.id === editingId ? updated : song
          )
        )
      } else {
        await songService.create(form)

        /*
         * Depois de criar, volta para a primeira página
         * para manter a ordenação/paginação do backend.
         */
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)

        fetchSongs(0)

        return
      }

      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
    } catch {
      alert('Erro ao salvar música')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      {/* Cabeçalho */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'var(--text-primary)',
            fontWeight: '400',
            textShadow: '0 2px 4px var(--shadow)',
          }}
        >
          {t('admin.dashboard.songs')}
        </h1>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setForm(emptyForm)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--pink-gradient)',
            color: 'var(--color-marfim)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: '500',
            textShadow: '0 2px 4px var(--shadow)',
            transition: 'all 0.3s ease',
            boxShadow: '0 3px 8px var(--shadow)',
          }}
          onMouseEnter={e => {
            ; (
              e.currentTarget as HTMLButtonElement
            ).style.background =
              'linear-gradient(135deg, color-mix(in srgb, var(--accent-hover) 85%, white) 0%, var(--accent-hover) 100%)'
          }}
          onMouseLeave={e => {
            ; (
              e.currentTarget as HTMLButtonElement
            ).style.background = 'var(--pink-gradient)'
          }}
        >
          <Plus size={16} />
          {t('admin.actions.add')}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--text-primary)',
              fontWeight: '400',
              textShadow: '0 2px 4px var(--shadow)',
            }}
          >
            {editingId
              ? `${t('admin.actions.edit')} música`
              : `${t('admin.actions.add')} música`}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {/* Título */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <label
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('admin.add.title')}
              </label>

              <input
                value={form.title}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                style={inputStyle}
                placeholder={t('placeholders.song_title')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Artista */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <label
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('admin.add.artist')}
              </label>

              <input
                value={form.artist}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    artist: e.target.value,
                  }))
                }
                style={inputStyle}
                placeholder={t('placeholders.song_artist')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Gênero */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <label
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('admin.add.genre')}
              </label>

              <input
                value={form.genre}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    genre: e.target.value,
                  }))
                }
                style={inputStyle}
                placeholder={t('placeholders.song_genre')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Cloudinary */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <label
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('admin.add.url_cloudinary')}
              </label>

              <input
                value={form.audioUrl}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    audioUrl: e.target.value,
                  }))
                }
                style={inputStyle}
                placeholder={t('placeholders.song_cloudinary')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Letras */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                gridColumn: '1 / -1',
              }}
            >
              <label
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  textShadow: '0 2px 4px var(--shadow)',
                }}
              >
                {t('admin.add.lyrics')}
              </label>

              <textarea
                value={form.lyrics}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    lyrics: e.target.value,
                  }))
                }
                style={{
                  ...inputStyle,
                  minHeight: '220px',
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
                placeholder={t('placeholders.song_lyrics')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>
          </div>

          {/* Mais pedida */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              textShadow: '0 2px 4px var(--shadow)',
              width: 'fit-content',
            }}
          >
            <input
              type="checkbox"
              checked={form.mostRequested}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  mostRequested: e.target.checked,
                }))
              }
            />

            <Star
              size={14}
              color="var(--accent-primary)"
            />

            {t('admin.add.mark')}
          </label>

          {/* Botões */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--pink-gradient)',
                color: 'var(--color-marfim)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: '500',
                textShadow: '0 2px 4px var(--shadow)',
                transition: 'all 0.3s ease',
                boxShadow: '0 3px 8px var(--shadow)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, color-mix(in srgb, var(--accent-hover) 85%, white) 0%, var(--accent-hover) 100%)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--pink-gradient)'
              }}
            >
              <Check size={15} />
              {saving ? '...' : t('admin.actions.save')}
            </button>
            <button
              onClick={handleCancel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: '500',
                textShadow: '0 2px 4px var(--shadow)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)',
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)',
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              }}
            >
              <X size={15} />
              {t('admin.actions.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Lista de músicas */}
      {songs.length === 0 ? (
        <p
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Nenhuma música encontrada.
        </p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {songs.map(song => (
              <div
                key={song.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  boxShadow: 'var(--shadow)',
                  transition:
                    'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el =
                    e.currentTarget as HTMLDivElement

                  el.style.transform = 'translateX(4px)'
                  el.style.boxShadow =
                    '0 4px 16px rgba(0,0,0,0.1)'
                  el.style.borderColor =
                    'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  const el =
                    e.currentTarget as HTMLDivElement

                  el.style.transform = 'translateX(0)'
                  el.style.boxShadow = 'var(--shadow)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                {song.mostRequested && (
                  <Star
                    size={14}
                    color="var(--accent-primary)"
                    fill="var(--accent-primary)"
                  />
                )}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: '500',
                      textShadow:
                        '0 2px 4px var(--shadow)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {song.title}
                  </p>

                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      textShadow:
                        '0 2px 4px var(--shadow)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {song.artist} • {song.genre}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexShrink: 0,
                  }}
                >
                  {/* Editar */}
                  <button
                    onClick={() => handleEdit(song)}
                    aria-label="Editar música"
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const button =
                        e.currentTarget as HTMLButtonElement

                      button.style.borderColor =
                        'var(--accent-primary)'
                      button.style.color =
                        'var(--accent-primary)'
                      button.style.backgroundColor =
                        'var(--bg-secondary)'
                    }}
                    onMouseLeave={e => {
                      const button =
                        e.currentTarget as HTMLButtonElement

                      button.style.borderColor =
                        'var(--border)'
                      button.style.color =
                        'var(--text-secondary)'
                      button.style.backgroundColor =
                        'transparent'
                    }}
                  >
                    <Pencil size={14} />
                  </button>

                  {/* Excluir */}
                  <button
                    onClick={() => handleDelete(song.id)}
                    aria-label="Excluir música"
                    style={{
                      background: 'none',
                      border: '1px solid #ef444440',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer',
                      color: '#ef4444',
                      display: 'flex',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const button =
                        e.currentTarget as HTMLButtonElement

                      button.style.backgroundColor =
                        'rgba(239,68,68,0.1)'
                      button.style.borderColor =
                        '#ef4444'
                    }}
                    onMouseLeave={e => {
                      const button =
                        e.currentTarget as HTMLButtonElement

                      button.style.backgroundColor =
                        'transparent'
                      button.style.borderColor =
                        '#ef444440'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação + Voltar ao topo */}
          {totalPages > 1 && (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '24px',
                paddingBottom: '8px',
              }}
            >
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
          )}
        </>
      )}
    </div>
  )
}