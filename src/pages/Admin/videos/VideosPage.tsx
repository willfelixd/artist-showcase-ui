import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react'
import { videoService } from '../../../services/videoService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
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

const inputStyle = {
  padding: '8px 12px',
  backgroundColor: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
}

export default function VideosPage() {
  const { t } = useTranslation()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<VideoForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchVideos = () => {
    setLoading(true)
    videoService.findAll(0, 100)
      .then(data => setVideos(data.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchVideos()
  }, [])

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
      setVideos(prev => prev.filter(v => v.id !== id))
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
        setVideos(prev => prev.map(v => v.id === editingId ? updated : v))
      } else {
        const created = await videoService.create(form)
        setVideos(prev => [...prev, created])
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          fontWeight: '400',
        }}>
          {t('admin.dashboard.videos')}
        </h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--color-marfim)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          <Plus size={16} />
          {t('admin.actions.add')}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            color: 'var(--text-primary)',
            fontWeight: '400',
          }}>
            {editingId ? t('admin.actions.edit') : t('admin.actions.add')} vídeo
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                {t('admin.add.title')}
              </label>
              <input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                style={inputStyle}
                placeholder={t('placeholders.video_title')}
                onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                {t('admin.add.url')}
              </label>
              <input
                value={form.youtubeUrl}
                onChange={e => setForm(p => ({ ...p, youtubeUrl: e.target.value }))}
                style={inputStyle}
                placeholder={t('placeholders.youtube_url')}
                onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                {t('admin.add.description')}
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
                placeholder={t('placeholders.video_desc')}
                onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            width: 'fit-content', // ← limita a área clicável ao conteúdo
          }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
            />
            <Star size={14} color="var(--accent-primary)" />
            {t('admin.add.mark_featured')}
          </label>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-marfim)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
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
              }}
            >
              <X size={15} />
              {t('admin.actions.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Lista de vídeos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {videos.map(video => (
          <div
            key={video.id}
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
              }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: '500',
                  flex: 1,
                }}>
                  {video.title}
                  {video.featured && (
                    <Star
                      size={12}
                      color="var(--accent-primary)"
                      fill="var(--accent-primary)"
                      style={{ marginLeft: '6px', display: 'inline' }}
                    />
                  )}
                </p>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => handleEdit(video)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '5px',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                    }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #ef444440',
                      borderRadius: '6px',
                      padding: '5px',
                      cursor: 'pointer',
                      color: '#ef4444',
                      display: 'flex',
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
    </div>
  )
}