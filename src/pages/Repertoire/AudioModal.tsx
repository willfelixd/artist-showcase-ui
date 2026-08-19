import { createPortal } from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music2,
} from 'lucide-react'
import type { Song } from '../../types'

interface AudioModalProps {
  song: Song
  onClose: () => void
}

export function AudioModal({ song, onClose }: AudioModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)

  // Fecha com ESC e controla play/pause com ESPAÇO
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [isPlaying, onClose])

  // Bloqueia scroll enquanto o modal estiver aberto
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Auto play ao abrir
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Alguns navegadores podem bloquear autoplay
        })
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { })
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    const current = audioRef.current.currentTime
    const total = audioRef.current.duration

    setCurrentTime(current)

    if (total && Number.isFinite(total)) {
      setProgress((current / total) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!audioRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))

    audioRef.current.currentTime = percentage * duration
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    const nextMuted = !isMuted

    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value)

    if (audioRef.current) {
      audioRef.current.volume = value
      audioRef.current.muted = value === 0
    }

    setVolume(value)
    setIsMuted(value === 0)
  }

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return '0:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,

        // Fundo mais leve e integrado ao site
        background: 'rgba(20, 15, 18, 0.58)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        zIndex: 9999,
        padding: '20px',

        animation: 'audioModalFadeIn 0.25s ease',
      }}
    >
      {/* Card do player */}
      <div
        onClick={e => e.stopPropagation()}
        className="card-glass"
        style={{
          width: '100%',
          maxWidth: '420px',

          padding: '28px 24px',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          gap: '22px',

          borderRadius: '20px',

          boxShadow:
            '0 24px 60px rgba(0, 0, 0, 0.35)',

          border:
            '1px solid color-mix(in srgb, var(--accent-primary) 25%, var(--border))',

          animation:
            'audioModalScaleIn 0.25s ease',

          position: 'relative',
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

        {/* Disco */}
        <div
          style={{
            width: '120px',
            height: '120px',

            flexShrink: 0,

            borderRadius: '50%',

            background: `
              conic-gradient(
                var(--accent-primary) 0deg,
                var(--bg-secondary) 60deg,
                var(--accent-primary) 120deg,
                var(--bg-secondary) 180deg,
                var(--accent-primary) 240deg,
                var(--bg-secondary) 300deg,
                var(--accent-primary) 360deg
              )
            `,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            animation: isPlaying
              ? 'audioDiscSpin 4s linear infinite'
              : 'none',

            boxShadow: isPlaying
              ? '0 0 28px color-mix(in srgb, var(--accent-primary) 35%, transparent)'
              : '0 6px 20px rgba(0, 0, 0, 0.2)',

            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Centro do disco */}
          <div
            style={{
              width: '48px',
              height: '48px',

              borderRadius: '50%',

              background:
                'var(--bg-primary)',

              border:
                '1px solid var(--border)',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Music2
              size={20}
              color="var(--accent-primary)"
            />
          </div>
        </div>

        {/* Informações da música */}
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            padding: '0 24px',
          }}
        >
          <h2
            style={{
              fontFamily:
                'var(--font-display)',

              fontSize:
                'clamp(1.25rem, 4vw, 1.5rem)',

              color:
                'var(--text-primary)',

              fontWeight: '500',

              margin: '0 0 6px',

              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',

              textShadow:
                '0 2px 4px var(--shadow)',
            }}
          >
            {song.title}
          </h2>

          <p
            style={{
              color:
                'var(--text-secondary)',

              fontFamily:
                'var(--font-body)',

              fontSize: '13px',

              margin: 0,

              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {song.artist} • {song.genre}
          </p>
        </div>

        {/* Progresso */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
        >
          <div
            onClick={handleProgressClick}
            role="slider"
            aria-label="Progresso da música"
            style={{
              width: '100%',
              height: '5px',

              backgroundColor:
                'var(--border)',

              borderRadius: '999px',

              cursor: duration
                ? 'pointer'
                : 'default',

              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,

                background:
                  'var(--pink-gradient)',

                borderRadius: '999px',

                transition:
                  'width 0.1s linear',

                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',

                  right: '-5px',
                  top: '-3px',

                  width: '11px',
                  height: '11px',

                  borderRadius: '50%',

                  background:
                    'var(--accent-primary)',

                  boxShadow:
                    '0 0 7px color-mix(in srgb, var(--accent-primary) 50%, transparent)',
                }}
              />
            </div>
          </div>

          {/* Tempo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',

              color:
                'var(--text-muted)',

              fontFamily:
                'var(--font-body)',

              fontSize: '11px',
            }}
          >
            <span>
              {formatTime(currentTime)}
            </span>

            <span>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controles */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            gap: '20px',

            width: '100%',
          }}
        >
          {/* Volume */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={
              isMuted
                ? 'Ativar som'
                : 'Silenciar'
            }
            style={{
              background: 'none',
              border: 'none',

              cursor: 'pointer',

              color:
                'var(--text-muted)',

              display: 'flex',

              padding: '6px',

              transition:
                'color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color =
                'var(--accent-primary)'

              e.currentTarget.style.transform =
                'scale(1.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color =
                'var(--text-muted)'

              e.currentTarget.style.transform =
                'scale(1)'
            }}
          >
            {isMuted
              ? <VolumeX size={19} />
              : <Volume2 size={19} />
            }
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              isPlaying
                ? 'Pausar'
                : 'Reproduzir'
            }
            style={{
              width: '56px',
              height: '56px',

              flexShrink: 0,

              borderRadius: '50%',

              background:
                'var(--pink-gradient)',

              border: 'none',

              cursor: 'pointer',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              boxShadow:
                '0 5px 20px color-mix(in srgb, var(--accent-primary) 35%, transparent)',

              transition:
                'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              const button = e.currentTarget

              button.style.transform =
                'scale(1.07)'

              button.style.boxShadow =
                '0 8px 26px color-mix(in srgb, var(--accent-primary) 50%, transparent)'
            }}
            onMouseLeave={e => {
              const button = e.currentTarget

              button.style.transform =
                'scale(1)'

              button.style.boxShadow =
                '0 5px 20px color-mix(in srgb, var(--accent-primary) 35%, transparent)'
            }}
          >
            {isPlaying ? (
              <Pause
                size={24}
                color="white"
                fill="white"
              />
            ) : (
              <Play
                size={24}
                color="white"
                fill="white"
                style={{
                  marginLeft: '2px',
                }}
              />
            )}
          </button>

          {/* Slider de volume */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            style={{
              width: '72px',

              accentColor:
                'var(--accent-primary)',

              cursor: 'pointer',
            }}
          />
        </div>

        {/* Dica */}
        <p
          style={{
            color:
              'var(--text-muted)',

            fontFamily:
              'var(--font-body)',

            fontSize: '10px',

            letterSpacing: '0.8px',

            margin: 0,

            opacity: 0.8,
          }}
        >
          ESPAÇO para pausar • ESC para fechar
        </p>
      </div>

      {/* Áudio */}
      <audio
        ref={audioRef}
        src={song.audioUrl || ''}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <style>{`
        @keyframes audioModalFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes audioModalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes audioDiscSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>,
    document.body
  )
}