import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { X } from 'lucide-react'

interface SongModalProps {
  title: string
  lyrics: string
  onClose: () => void
}

export function SongModal({ title, lyrics, onClose }: SongModalProps) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-glass"
        style={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '24px',
          position: 'relative',
          animation: 'scaleIn 0.3s ease',
        }}
      >
        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar player"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',

            width: '34px',
            height: '34px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '50%',

            color: 'var(--text-muted)',
            cursor: 'pointer',

            transition:
              'color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            const button = e.currentTarget

            button.style.color =
              'var(--accent-primary)'

            button.style.borderColor =
              'var(--accent-primary)'

            button.style.transform =
              'scale(1.05)'
          }}
          onMouseLeave={e => {
            const button = e.currentTarget

            button.style.color =
              'var(--text-muted)'

            button.style.borderColor =
              'var(--border)'

            button.style.transform =
              'scale(1)'
          }}
        >
          <X size={18} />
        </button>

        {/* Título */}
        <h3 style={{
          marginBottom: '16px',
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          textShadow: '0 1px 3px var(--shadow)',
        }}>
          ♫ {title} <span
            style={{
              display: 'inline-block',
              transform: 'scaleX(-1)',
            }}
          >
          ♫ 
          </span>
        </h3>

        {/* Letra */}
        <p style={{
          whiteSpace: 'pre-line',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          fontFamily: 'var(--font-body)',
          textShadow: '0 2px 4px var(--shadow)',
        }}>
          {lyrics}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
      `}</style>
    </div>,
    document.body
  )
}