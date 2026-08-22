import { useState } from 'react'
import { Play } from 'lucide-react'
import type { Video } from '../../types'
import { useTranslation } from 'react-i18next'

interface VideoCardProps {
  video: Video
  onClick: (video: Video) => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { t } = useTranslation()

  return (
    <article
      onClick={() => onClick(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '14px',
        overflow: 'hidden',
        border: `1px solid ${isHovered
            ? 'var(--accent-primary)'
            : 'var(--border)'
          }`,
        boxShadow: isHovered
          ? '0 14px 35px var(--shadow)'
          : 'var(--shadow)',
        backgroundColor: 'var(--bg-secondary)',
        transform: isHovered
          ? 'translateY(-4px)'
          : 'translateY(0)',
        transition:
          'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Iluminação premium */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-70px',
          right: '-70px',
          width: '170px',
          height: '170px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--accent-primary), transparent 70%)',
          opacity: isHovered ? 0.12 : 0.04,
          filter: 'blur(24px)',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
        }}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: isHovered
              ? 'scale(1.06)'
              : 'scale(1)',
            transition:
              'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Botão Play */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: isHovered
                ? '0 0 0 8px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.35)'
                : '0 4px 16px rgba(0,0,0,0.25)',
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? 'scale(1)'
                : 'scale(0.82)',
              transition:
                'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Play
              size={24}
              color="white"
              fill="white"
              style={{
                display: 'block',
                marginLeft: '3px',
              }}
            />
          </div>
        </div>

        {/* Badge Destaque */}
        {video.featured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 9px',
              borderRadius: '999px',
              background: 'var(--pink-gradient)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--color-marfim)',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px var(--shadow)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(8px)',
              zIndex: 4,
            }}
          >
            ★ {t('common.emphasis')}
          </div>
        )}
      </div>

      {/* Informações */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '92px',
          padding: '14px 16px 16px',
        }}
      >
        {/* Título */}
        <p
          title={video.title}
          style={{
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: 1.35,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '0 2px 4px var(--shadow)',
          }}
        >
          {video.title}
        </p>

        {/* Descrição */}
        {video.description && (
          <p
            title={video.description}
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              lineHeight: 1.4,
              fontFamily: 'var(--font-body)',
              margin: '6px 0 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textShadow: '0 2px 4px var(--shadow)',
            }}
          >
            {video.description}
          </p>
        )}
      </div>
    </article>
  )
}