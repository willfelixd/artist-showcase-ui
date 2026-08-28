import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react'
import { videoService } from '../../../services/videoService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import Pagination from '../../../components/ui/Pagination'
import { BackToTopButton } from '../../../components/ui/BackToTopButton'
import type { Video } from '../../../types'

interface VideoForm {
  title: string
  description: string
  youtubeUrl: string
  featured: boolean
}

const emptyForm: VideoForm = {
  title: '',
  description: '',
  youtubeUrl: '',
  featured: false,
}

const PAGE_SIZE = 9

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

export default function VideosPage() {
  const { t } = useTranslation()

  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<VideoForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchVideos = (pageNumber = 0) => {
    setLoading(true)

    videoService
      .findAll(pageNumber, PAGE_SIZE)
      .then(data => {
        setVideos(data.content)
        setPage(pageNumber)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchVideos(0)
  }, [])

  const handlePageChange = (newPage: number) => {
    fetchVideos(newPage)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleEdit = (video: Video) => {
    setEditingId(video.id)

    setForm({
      title: video.title,
      description: video.description || '',
      youtubeUrl: video.youtubeUrl,
      featured: video.featured,
    })

    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('admin.actions.confirm_delete'))) return

    try {
      await videoService.delete(id)

      setVideos(prev => {
        const updated = prev.filter(video => video.id !== id)

        if (updated.length === 0 && page > 0) {
          fetchVideos(page - 1)
        }

        return updated
      })
    } catch {
      alert('Erro ao deletar vídeo')
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.youtubeUrl) return

    setSaving(true)

    try {
      if (editingId) {
        const updated = await videoService.update(editingId, form)

        setVideos(prev =>
          prev.map(video =>
            video.id === editingId ? updated : video
          )
        )
      } else {
        await videoService.create(form)

        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)

        fetchVideos(0)

        return
      }

      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
    } catch {
      alert('Erro ao salvar vídeo')
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
          {t('admin.dashboard.videos')}
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
              ? `${t('admin.actions.edit')} vídeo`
              : `${t('admin.actions.add')} vídeo`}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
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
                placeholder={t('placeholders.video_title')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* URL */}
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
                {t('admin.add.url')}
              </label>

              <input
                value={form.youtubeUrl}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    youtubeUrl: e.target.value,
                  }))
                }
                style={inputStyle}
                placeholder={t('placeholders.youtube_url')}
                onFocus={e =>
                (e.target.style.borderColor =
                  'var(--accent-primary)')
                }
                onBlur={e =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Descrição */}
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
                {t('admin.add.description')}
              </label>

              <textarea
                value={form.description}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  lineHeight: '1.5',
                }}
                placeholder={t('placeholders.video_desc')}
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

          {/* Destaque */}
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
              checked={form.featured}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  featured: e.target.checked,
                }))
              }
            />

            <Star
              size={14}
              color="var(--accent-primary)"
            />

            {t('admin.add.mark_featured')}
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
                ; (
                  e.currentTarget as HTMLButtonElement
                ).style.color = 'var(--accent-primary)'

                  ; (
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor =
                    'var(--bg-secondary)'
              }}
              onMouseLeave={e => {
                ; (
                  e.currentTarget as HTMLButtonElement
                ).style.color = 'var(--text-secondary)'

                  ; (
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = 'transparent'
              }}
            >
              <X size={15} />
              {t('admin.actions.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Lista de vídeos */}
      {videos.length === 0 ? (
        <p
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Nenhum vídeo encontrado.
        </p>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {videos.map(video => (
              <div
                key={video.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow)',
                  transition:
                    'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el =
                    e.currentTarget as HTMLDivElement

                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow =
                    '0 12px 32px rgba(0,0,0,0.15)'
                  el.style.borderColor =
                    'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  const el =
                    e.currentTarget as HTMLDivElement

                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'var(--shadow)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                />

                <div style={{ padding: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px',
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
                        flex: 1,
                      }}
                    >
                      {video.title}

                      {video.featured && (
                        <Star
                          size={12}
                          color="var(--accent-primary)"
                          fill="var(--accent-primary)"
                          style={{
                            marginLeft: '6px',
                            display: 'inline',
                          }}
                        />
                      )}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',
                      }}
                    >
                      {/* Editar */}
                      <button
                        onClick={() => handleEdit(video)}
                        aria-label="Editar vídeo"
                        style={{
                          background: 'none',
                          border:
                            '1px solid var(--border)',
                          borderRadius: '6px',
                          padding: '5px',
                          cursor: 'pointer',
                          color:
                            'var(--text-secondary)',
                          display: 'flex',
                          transition:
                            'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          const el =
                            e.currentTarget as HTMLButtonElement

                          el.style.borderColor =
                            'var(--accent-primary)'
                          el.style.color =
                            'var(--accent-primary)'
                          el.style.backgroundColor =
                            'var(--bg-secondary)'
                        }}
                        onMouseLeave={e => {
                          const el =
                            e.currentTarget as HTMLButtonElement

                          el.style.borderColor =
                            'var(--border)'
                          el.style.color =
                            'var(--text-secondary)'
                          el.style.backgroundColor =
                            'transparent'
                        }}
                      >
                        <Pencil size={13} />
                      </button>

                      {/* Excluir */}
                      <button
                        onClick={() =>
                          handleDelete(video.id)
                        }
                        aria-label="Excluir vídeo"
                        style={{
                          background: 'none',
                          border:
                            '1px solid #ef444440',
                          borderRadius: '6px',
                          padding: '5px',
                          cursor: 'pointer',
                          color: '#ef4444',
                          display: 'flex',
                          transition:
                            'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          const el =
                            e.currentTarget as HTMLButtonElement

                          el.style.backgroundColor =
                            'rgba(239,68,68,0.1)'
                          el.style.borderColor =
                            '#ef4444'
                        }}
                        onMouseLeave={e => {
                          const el =
                            e.currentTarget as HTMLButtonElement

                          el.style.backgroundColor =
                            'transparent'
                          el.style.borderColor =
                            '#ef444440'
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
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