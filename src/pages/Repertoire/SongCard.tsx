import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FileText,
  Music2,
  Star,
  Headphones,
} from 'lucide-react'
import type { Song } from '../../types'
import { SongModal } from './SongModal'

interface SongCardProps {
  song: Song
  index?: number
  showIndex?: boolean
  onAudioClick?: (song: Song) => void
}

export function SongCard({
  song,
  index,
  showIndex = false,
  onAudioClick,
}: SongCardProps) {
  const [showLyrics, setShowLyrics] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const hasLyrics = Boolean(song.lyrics?.trim())
  const hasAudio = Boolean(song.audioUrl?.trim())

  const { t } = useTranslation()

  return (
    <>
      <article
        className="card-glass"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          gap: '14px',
          height: '148px',
          minWidth: 0,
          padding: '16px',
          overflow: 'hidden',
          transition:
            'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          borderColor: isHovered
            ? 'var(--accent-primary)'
            : 'var(--border)',
          boxShadow: isHovered
            ? '0 14px 35px var(--shadow)'
            : 'var(--shadow)',
        }}
      >
        {/* Iluminação premium */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, var(--accent-primary), transparent 70%)',
            opacity: isHovered ? 0.10 : 0.045,
            filter: 'blur(20px)',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Número / ícone */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: showIndex ? '42px' : '24px',
            minWidth: showIndex ? '42px' : '24px',
            borderRight: '1px solid var(--border)',
            paddingRight: '12px',
          }}
        >
          {showIndex && index !== undefined ? (
            <span
              className="text-gradient-number"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                lineHeight: 1,
                fontWeight: 300,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : (
            <Music2
              size={18}
              color={
                isHovered
                  ? 'var(--accent-primary)'
                  : 'var(--text-muted)'
              }
              style={{
                transition: 'color 0.3s ease',
              }}
            />
          )}

          {showIndex && (
            <Music2
              size={15}
              color={
                isHovered
                  ? 'var(--accent-primary)'
                  : 'var(--text-muted)'
              }
              style={{
                transition: 'color 0.3s ease',
              }}
            />
          )}
        </div>

        {/* Conteúdo */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Título */}
          <p
            title={song.title}
            style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              marginBottom: '4px',
              textShadow: '0 2px 4px var(--shadow)',
            }}
          >
            {song.title}
          </p>

          {/* Artista */}
          <p
            title={song.artist}
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              textShadow: '0 2px 4px var(--shadow)',
            }}
          >
            {song.artist}
          </p>

          {/* Espaçamento flexível */}
          <div style={{ flex: 1 }} />

          {/* Metadados + ações */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              minWidth: 0,
            }}
          >
            {/* Gênero */}
            <span
              title={song.genre}
              style={{
                display: 'inline-block',
                maxWidth: '110px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color: 'var(--text-muted)',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                padding: '3px 8px',
                borderRadius: '999px',
              }}
            >
              {song.genre}
            </span>

            {/* Ações */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}
            >
              {/* Letra */}
              {hasLyrics && (
                <button
                  type="button"
                  onClick={() => setShowLyrics(true)}
                  aria-label={`Ver letra de ${song.title}`}
                  title={t('common.lyrics_button')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    padding: 0,
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition:
                      'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const button = e.currentTarget

                    button.style.color = 'var(--accent-primary)'
                    button.style.borderColor = 'var(--accent-primary)'
                    button.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const button = e.currentTarget

                    button.style.color = 'var(--text-muted)'
                    button.style.borderColor = 'var(--border)'
                    button.style.transform = 'translateY(0)'
                  }}
                >
                  <FileText size={14} />
                </button>
              )}

              {/* Áudio */}
              {hasAudio && (
                <button
                  type="button"
                  onClick={() => onAudioClick?.(song)}
                  aria-label={`Ouvir ${song.title}`}
                  title={t('common.hear_button')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    padding: 0,
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition:
                      'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const button = e.currentTarget

                    button.style.color = 'var(--accent-primary)'
                    button.style.borderColor = 'var(--accent-primary)'
                    button.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const button = e.currentTarget

                    button.style.color = 'var(--text-muted)'
                    button.style.borderColor = 'var(--border)'
                    button.style.transform = 'translateY(0)'
                  }}
                >
                  <Headphones size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mais pedida */}
        {song.mostRequested && (
          <div
            title={t('common.most_requested')}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 8px var(--shadow)',
              zIndex: 2,
              lineHeight: 0,
            }}
          >
            <Star
              size={14}
              color="var(--accent-primary)"
              fill="var(--accent-primary)"
              style={{
                display: 'block',
              }}
            />
          </div>
        )}
      </article>

      {/* Modal da letra */}
      {showLyrics && song.lyrics && (
        <SongModal
          title={song.title}
          lyrics={song.lyrics}
          onClose={() => setShowLyrics(false)}
        />
      )}
    </>
  )
}