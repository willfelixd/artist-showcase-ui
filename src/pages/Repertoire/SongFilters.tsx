import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SongFiltersProps {
  title: string
  genre: string
  genres: string[]
  onTitleChange: (value: string) => void
  onGenreChange: (value: string) => void
  onClear: () => void
}

export function SongFilters({
  title,
  genre,
  genres,
  onTitleChange,
  onGenreChange,
  onClear,
}: SongFiltersProps) {
  const { t } = useTranslation()
  const hasFilters = title !== '' || genre !== ''

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'center',
    }}>
      {/* Busca por título */}
      <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
        <Search
          size={16}
          color="var(--text-muted)"
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        <input
          type="text"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          placeholder={t('repertoire.search_placeholder')}
          style={{
            width: '100%',
            padding: '10px 12px 10px 38px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--accent-primary)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--border)'
          }}
        />
      </div>

      {/* Filtro por gênero */}
      <select
        value={genre}
        onChange={e => onGenreChange(e.target.value)}
        style={{
          padding: '10px 16px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer',
          minWidth: '160px',
        }}
      >
        <option value="">{t('repertoire.all_genres')}</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      {/* Botão limpar filtros */}
      {hasFilters && (
        <button
          onClick={onClear}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px 16px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        >
          <X size={14} />
          Limpar
        </button>
      )}
    </div>
  )
}