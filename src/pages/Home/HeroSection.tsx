import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Music, Mail } from 'lucide-react'
import type { Artist } from '../../types'
import isaPhoto from '../../assets/foto-isa.png'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'

// SVGs das redes sociais inline
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.43 0 .06 5.37.06 12c0 2.12.55 4.19 1.6 6.02L0 24l6.17-1.62A11.94 11.94 0 0 0 12.06 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.54-8.52zM12.06 21.8c-1.8 0-3.55-.48-5.1-1.4l-.36-.21-3.66.96.98-3.57-.23-.37a9.77 9.77 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.87 6.92c0 5.4-4.4 9.79-9.73 9.79zm5.37-7.34c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.1-.23-.55-.47-.47-.64-.48-.17-.01-.36-.01-.55-.01s-.51.07-.78.36c-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.17 3 .15.19 2.03 3.1 4.93 4.34.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
    </svg>
  )
}

interface HeroSectionProps {
  artist: Artist
}
export function HeroSection({ artist }: HeroSectionProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isDesktop, setIsDesktop] = useState(false)
  const WHATSAPP_URL = "https://wa.me/5583998184555?text=Olá%20quero%20saber%20sobre%20shows"
  const INSTAGRAM_URL = "https://www.instagram.com/isatavarescantora?igsh=Z253bTVuY2xucnB4"
  const YOUTUBE_URL = "https://www.youtube.com/channel/UCwgcauZiYRFi3riiweImXfQ"

  useEffect(() => {
    const media =
      window.matchMedia('(min-width: 1024px)')
    const handleResize = () => {
      setIsDesktop(media.matches)
    }
    handleResize()
    media.addEventListener(
      'change',
      handleResize
    )
    return () => {
      media.removeEventListener(
        'change',
        handleResize
      )
    }
  }, [])
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        scrollMarginTop: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '48px 24px',
        // 👇 BACKGROUND
        backgroundImage: 'var(--hero-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* Overlay para melhorar leitura */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10,0,20,0.7))',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* CONTEÚDO */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection:
            isDesktop
              ? 'row'
              : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap:
            isDesktop
              ? '90px'
              : '32px',
          textAlign:
            isDesktop
              ? 'left'
              : 'center',
        }}
      >
        {/* FOTO */}
        {artist.profileImageUrl && (
          <div
            style={{
              position: 'relative',
              width:
                isDesktop
                  ? '340px'
                  : '190px',
              height:
                isDesktop
                  ? '460px'
                  : '190px',
              flexShrink: 0,
              animation:
                'heroImageEnter 1.2s ease forwards',
            }}
          >
            {/* LUZ DE PALCO */}
            <div
              style={{
                position: 'absolute',
                inset: '-60px',
                background:
                  'radial-gradient(circle, rgba(255,77,141,.35), transparent 70%)',
                filter: 'blur(35px)',
                zIndex: -1,
              }}
            />
            {/* MOLDURA */}
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius:
                  isDesktop
                    ? '35px 35px 90px 35px'
                    : '50%',
                border:
                  '3px solid var(--accent-primary)',
                boxShadow:
                  '0 0 35px rgba(255,77,141,.45)',
                transform:
                  isDesktop
                    ? 'rotate(-3deg)'
                    : 'none',
                transition:
                  'all .35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  isDesktop
                    ? 'rotate(0deg) scale(1.03)'
                    : 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  isDesktop
                    ? 'rotate(-3deg)'
                    : 'scale(1)'
              }}
            >
              <img
                src={isaPhoto}
                alt={artist.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        )}
        {/* CONTEÚDO DIREITO */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '600px',
          }}
        >
          {/* TEXTO */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation:
                'heroTextEnter 1s ease .4s forwards',
              opacity: 0,
            }}
          >
            <p
              style={{
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {t('home.hero.greeting')}
            </p>
            {/* NOME COM GLOW */}
            <h1
              className="text-gradient-hero"
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: 'clamp(3.5rem, 5vw, 5rem)',
                lineHeight: '1.2',
                fontWeight: '400',
              }}
            >
              {artist.name}
            </h1>
            <p
              style={{
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '1rem',
                maxWidth: '600px',
                lineHeight: '1.5',
              }}
            >
              {t('home.hero.bio')}
            </p>
          </div>
          {/* BOTÕES */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: '15px',
              gap: '16px',
              justifyContent:
                isDesktop
                  ? 'flex-start'
                  : 'center',
              animation:
                'heroButtonsEnter .8s ease 1s forwards',
              opacity: 0,
            }}
          >
            {/* AGENDA */}
            <button
              onClick={() => navigate('/agenda')}
              className="btn-premium"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              <CalendarDays size={18} />
              {t('home.hero.cta_schedule')}
            </button>
            {/* REPERTÓRIO */}
            <button
              onClick={() => navigate('/repertorio')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--accent-primary)',
                border:
                  '2px solid var(--accent-primary)',
                borderRadius: '999px',
                padding: '12px 24px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                transition: 'all .3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'var(--accent-primary)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  'transparent'
                e.currentTarget.style.color =
                  'var(--accent-primary)'
              }}
            >
              <Music size={18} />
              {t('home.hero.cta_repertoire')}
            </button>
            {/* CONTATO */}
            <button
              onClick={() => navigate('/contato')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--accent-hover)',
                border:
                  '2px solid var(--border)',
                borderRadius: '999px',
                padding: '12px 24px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                transition: 'all .3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  'var(--accent-primary)'
                e.currentTarget.style.color =
                  'var(--accent-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'var(--border)'
                e.currentTarget.style.color =
                  'var(--accent-hover)'
              }}
            >
              <Mail size={18} />
              {t('home.hero.cta_contact')}
            </button>
          </div>

          {/* REDES SOCIAIS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '60px',
            }}
          >
            {artist && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  opacity: 0,
                  animation: 'socialEnter 0.8s ease 1.3s forwards',
                }}
              >
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    opacity: 0.8,
                    transition: 'all 0.25s ease',
                    lineHeight: 0,
                  }}
                  onMouseEnter={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'
                    icon.style.color = 'var(--accent-primary)'
                    icon.style.border = '1px solid var(--accent-primary)'
                    icon.style.transform = 'translateY(-2px)'
                    icon.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'rgba(255, 255, 255, 0.06)'
                    icon.style.color = 'var(--text-secondary)'
                    icon.style.border = '1px solid var(--border)'
                    icon.style.transform = 'translateY(0)'
                    icon.style.opacity = '0.8'
                  }}
                >
                  <InstagramIcon />
                </a>

                {/* YouTube */}
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    opacity: 0.8,
                    transition: 'all 0.25s ease',
                    lineHeight: 0,
                  }}
                  onMouseEnter={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'
                    icon.style.color = 'var(--accent-primary)'
                    icon.style.border = '1px solid var(--accent-primary)'
                    icon.style.transform = 'translateY(-2px)'
                    icon.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'rgba(255, 255, 255, 0.06)'
                    icon.style.color = 'var(--text-secondary)'
                    icon.style.border = '1px solid var(--border)'
                    icon.style.transform = 'translateY(0)'
                    icon.style.opacity = '0.8'
                  }}
                >
                  <YouTubeIcon />
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    opacity: 0.8,
                    transition: 'all 0.25s ease',
                    lineHeight: 0,
                  }}
                  onMouseEnter={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'
                    icon.style.color = 'var(--accent-primary)'
                    icon.style.border = '1px solid var(--accent-primary)'
                    icon.style.transform = 'translateY(-2px)'
                    icon.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    const icon = e.currentTarget as HTMLAnchorElement
                    icon.style.background = 'rgba(255, 255, 255, 0.06)'
                    icon.style.color = 'var(--text-secondary)'
                    icon.style.border = '1px solid var(--border)'
                    icon.style.transform = 'translateY(0)'
                    icon.style.opacity = '0.8'
                  }}
                >
                  <WhatsAppIcon />
                </a>
              </div>
            )}
          </div>

          {/* LINHA VISUAL */}
          <div
            className="stage-line"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              animation: 'lineGrow 1s ease 1.7s forwards',
              marginTop: '1px',
            }}
          />
        </div>

        <ScrollIndicator targetId="about" direction="down" verticalOffset={65} />

        {/* ANIMAÇÕES */}
        <style>{`
          @keyframes heroImageEnter {
            0% {
              opacity:0;
              transform:
                translateX(-80px)
                rotate(-8deg);
              filter:blur(8px);
            }
            100% {
              opacity:1;
              transform:
                translateX(0)
                rotate(-3deg);
              filter:blur(0);
            }
          }
          @keyframes heroTextEnter {
            0% {
              opacity:0;
              transform:
                translateX(80px);
            }
            100% {
              opacity:1;
              transform:
                translateX(0);
            }
          }
          @keyframes heroButtonsEnter {
            0% {
              opacity:0;
              transform:
                translateY(30px);
            }
            100% {
              opacity:1;
              transform:
                translateY(0);
            }
          }
          @keyframes bounce {
            0%,100% {
              transform:
                translateX(-50%)
                translateY(0);
            }
            50% {
              transform:
                translateX(-50%)
                translateY(-6px);
            }
          }
          @keyframes scrollDot {
            0% {
              transform:
                translateY(0);
              opacity:1;
            }
            100% {
              transform:
                translateY(10px);
              opacity:0;
            }
          }
          @keyframes socialEnter {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  )
}