import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { Video } from '../../types'

interface VideoModalProps {
  video: Video
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {

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

  return (
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
        zIndex: 200,
        padding: '24px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
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
          transition: 'background 0.2s ease',
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
          marginTop: '48px',
        }}
      >
        {/* Título */}
        <h2 style={{
          color: 'white',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: '400',
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
          }}>
            {video.description}
          </p>
        )}

        {/* Dica para fechar */}
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          textAlign: 'center',
        }}>
          Pressione ESC ou clique fora para fechar
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}