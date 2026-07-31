import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react'
import { songService } from '../../../services/songService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import type { Song } from '../../../types'

interface SongForm {
  title: string
  artist: string
  genre: string
  youtubeUrl: string
  mostRequested: boolean
}

const emptyForm: SongForm = {
  title: '',
  artist: '',
  genre: '',
  youtubeUrl: '',
  mostRequested: false,
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

export default function SongsPage() {
  const { t } = useTranslation()
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<SongForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchSongs = () => {
    setLoading(true)
    songService.findAll({ size: 100 })
      .then(data => setSongs(data.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const handleEdit = (song: Song) => {
    setEditingId(song.id)
    setForm({
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      youtubeUrl: song.youtubeUrl || '',
      mostRequested: song.mostRequested,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('admin.actions.confirm_delete'))) return
    try {
      await songService.delete(id)
      setSongs(prev => prev.filter(s => s.id !== id))
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
        setSongs(prev => prev.map(s => s.id === editingId ? updated : s))
      } else {
        const created = await songService.create(form)
        setSongs(prev => [...prev, created])
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
          {t('admin.dashboard.songs')}
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
            {editingId ? t('admin.actions.edit') : t('admin.actions.add')} música
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                Título *
              </label>
              <input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                style={inputStyle}
                placeholder="Garota de Ipanema"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                Artista *
              </label>
              <input
                value={form.artist}
                onChange={e => setForm(p => ({ ...p, artist: e.target.value }))}
                style={inputStyle}
                placeholder="Tom Jobim"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                Gênero *
              </label>
              <input
                value={form.genre}
                onChange={e => setForm(p => ({ ...p, genre: e.target.value }))}
                style={inputStyle}
                placeholder="Bossa Nova"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                URL do YouTube
              </label>
              <input
                value={form.youtubeUrl}
                onChange={e => setForm(p => ({ ...p, youtubeUrl: e.target.value }))}
                style={inputStyle}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Mais pedida */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}>
            <input
              type="checkbox"
              checked={form.mostRequested}
              onChange={e => setForm(p => ({ ...p, mostRequested: e.target.checked }))}
            />
            <Star size={14} color="var(--accent-primary)" />
            Marcar como mais pedida
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

      {/* Lista de músicas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {songs.map(song => (
          <div
            key={song.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '12px 16px',
              boxShadow: 'var(--shadow)',
            }}
          >
            {song.mostRequested && (
              <Star size={14} color="var(--accent-primary)" fill="var(--accent-primary)" />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {song.title}
              </p>
              <p style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
              }}>
                {song.artist} • {song.genre}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleEdit(song)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                }}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(song.id)}
                style={{
                  background: 'none',
                  border: '1px solid #ef444440',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: '#ef4444',
                  display: 'flex',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}