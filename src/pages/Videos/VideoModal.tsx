import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Video } from '../../types'
import { useTranslation } from 'react-i18next'

interface VideoModalProps {
  video: Video
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {

  const [isDesktop, setIsDesktop] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')

    const handleResize = () => {
      setIsDesktop(media.matches)
    }

    handleResize()

    media.addEventListener('change', handleResize)

    return () => {
      media.removeEventListener('change', handleResize)
    }
  }, [])

  // Fecha com ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Bloqueia scroll do body enquanto modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999, // agora está acima de tudo
        padding: '24px',
        animation: 'fadeIn 0.2s ease',
        isolation: 'isolate', // evita conflitos de stacking context
      }}
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 100000, // sempre acima (até do iframe)
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'
        }}
        aria-label="Fechar"
      >
        <X size={20} />
      </button>

      {/* Container do player */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '28px',
        }}
      >
        {/* Título */}
        <h2 style={{
          color: 'white',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: '400',
          textShadow: '0 2px 6px var(--shadow)',
          textAlign: 'center',
        }}>
          {video.title}
        </h2>

        {/* Player */}
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 1, // evita iframe subir demais
        }}>
          <iframe
            src={`${video.embedUrl}?autoplay=1&rel=0`}
            title={video.title}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Descrição */}
        {video.description && (
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: '1.6',
            textShadow: '0 2px 4px var(--shadow)',
          }}>
            {video.description}
          </p>
        )}

        {/* Dica */}
        {isDesktop && (
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              textAlign: 'center',
              textShadow: '0 2px 4px var(--shadow)',
            }}
          >
            {t('common.video_tip')}
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>,
    document.body // aqui acontece a mágica
  )
}