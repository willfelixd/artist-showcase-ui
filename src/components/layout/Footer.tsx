import {
  Music,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { artistService } from '../../services/artistService'
import type { Artist } from '../../types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// SVG do Instagram
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

// SVG do YouTube
function YouTubeIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export function Footer() {
  const [artist, setArtist] = useState<Artist | null>(null)

  const { t } = useTranslation()

  const WHATSAPP_URL =
    'https://wa.me/5583998184555?text=Olá%20quero%20saber%20sobre%20shows'

  useEffect(() => {
    artistService
      .getProfile()
      .then(setArtist)
      .catch(() => { })
  }, [])

  const socialButtonStyle: React.CSSProperties = {
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'var(--text-primary)',
    background:
      'color-mix(in srgb, var(--bg-background) 35%, transparent)',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  }

  return (
    <footer
      style={{
        zIndex: 0,
        background: 'var(--bg-background-footer)',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto',
        transition: 'var(--transition-theme)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 24px 48px',
        }}
      >
        {/* Conteúdo principal */}
        <div
          className="footer-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Identidade */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                marginBottom: '12px',
              }}
            >
              <Music
                size={24}
                strokeWidth={1.8}
                color="var(--accent-primary)"
              />

              <span
                className="text-gradient-section"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  lineHeight: '1.2',
                  letterSpacing: '-0.7px',
                  textShadow: '0 2px 6px var(--shadow)',
                }}
              >
                {t('common.singer')}
              </span>
            </div>

            <p
              style={{
                maxWidth: '330px',
                margin: 0,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: '1.7',
                textShadow: '0 2px 4px var(--shadow)',
              }}
            >
              {t('footer.message')}
            </p>
          </div>

          {/* Redes sociais */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                margin: '0 0 16px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.4px',
                textAlign: 'center',
              }}
            >
              {t('footer.follow')}
            </h3>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {/* Instagram */}
              {artist?.instagramUrl && (
                <a
                  href={artist.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={socialButtonStyle}
                  onMouseEnter={e => {
                    const element = e.currentTarget

                    element.style.color = 'var(--accent-primary)'
                    element.style.borderColor = 'var(--accent-primary)'
                    element.style.transform = 'translateY(-3px)'
                    element.style.boxShadow =
                      '0 3px 8px color-mix(in srgb, var(--accent-primary) 12%, transparent)'
                  }}
                  onMouseLeave={e => {
                    const element = e.currentTarget

                    element.style.color = 'var(--text-primary)'
                    element.style.borderColor = 'var(--border)'
                    element.style.transform = 'translateY(0)'
                    element.style.boxShadow = 'none'
                  }}
                >
                  <InstagramIcon />
                </a>
              )}

              {/* YouTube */}
              {artist?.youtubeUrl && (
                <a
                  href={artist.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={socialButtonStyle}
                  onMouseEnter={e => {
                    const element = e.currentTarget

                    element.style.color = 'var(--accent-primary)'
                    element.style.borderColor = 'var(--accent-primary)'
                    element.style.transform = 'translateY(-3px)'
                    element.style.boxShadow =
                      '0 3px 8px color-mix(in srgb, var(--accent-primary) 12%, transparent)'
                  }}
                  onMouseLeave={e => {
                    const element = e.currentTarget

                    element.style.color = 'var(--text-primary)'
                    element.style.borderColor = 'var(--border)'
                    element.style.transform = 'translateY(0)'
                    element.style.boxShadow = 'none'
                  }}
                >
                  <YouTubeIcon />
                </a>
              )}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3
              style={{
                margin: '0 0 8px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.4px',
              }}
            >
              {t('footer.event')}
            </h3>

            <p
              style={{
                margin: '0 0 16px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                lineHeight: '1.6',
              }}
            >
              {t('footer.contact')}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a Isa pelo WhatsApp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 15px',
                borderRadius: '999px',
                color: 'var(--color-marfim)',
                background: 'var(--pink-gradient)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                boxShadow:
                  '0 3px 10px color-mix(in srgb, var(--accent-primary) 14%, transparent)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const element = e.currentTarget

                element.style.transform = 'translateY(-2px)'
                element.style.boxShadow =
                  '0 4px 12px color-mix(in srgb, var(--accent-primary) 16%, transparent)'
              }}
              onMouseLeave={e => {
                const element = e.currentTarget

                element.style.transform = 'translateY(0)'
                element.style.boxShadow =
                  '0 3px 10px color-mix(in srgb, var(--accent-primary) 14%, transparent)'
              }}
            >
              <MessageCircle size={15} strokeWidth={2} />

              {t('footer.button')}

              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            height: '1px',
            background: 'var(--border)',
            margin: '42px 0 20px',
            opacity: 0.7,
          }}
        />

        {/* Rodapé inferior */}
        <div
          className="footer-bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Copyright e links legais */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span
              style={{
                color: 'var(--text-primary)',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                textShadow: '0 2px 4px var(--shadow)',
              }}
            >
              <p>
                © {new Date().getFullYear()} Isa Tavares. {t('footer.rights_reserved')}
                <br />
                · {t('footer.developed_by')}{' '}
                <strong style={{ fontWeight: 700 }}>
                  William Felix
                </strong>
              </p>
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="/politica-de-privacidade"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <Link
                  to="/politica-de-privacidade"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                  }}
                >
                  {t('footer.privacy_policy')}
                </Link>
              </a>

              <span
                style={{
                  color: 'var(--text-muted)',
                  opacity: 0.5,
                  fontSize: '10px',
                }}
              >
                •
              </span>

              <a
                href="/termos-de-uso"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <Link
                  to="/termos-de-uso"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                  }}
                >
                  {t('footer.terms_use')}
                </Link>
              </a>
            </div>
          </div>

          {/* Admin */}
          <a
            href="/admin/login"
            style={{
              color: 'var(--text-muted)',
              fontSize: '10px',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              opacity: 0.35,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.color = 'var(--accent-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '0.35'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            Admin
          </a>
        </div>
      </div>

      {/* Responsividade */}
      <style>
        {`
          @media (max-width: 768px) {
            .footer-main-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              text-align: center;
            }

            .footer-main-grid > div {
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .footer-main-grid p {
              max-width: 380px !important;
            }

            .footer-bottom {
              flex-direction: column !important;
              text-align: center;
              gap: 14px !important;
            }

            .footer-bottom > div:first-child {
              align-items: center;
            }
          }
        `}
      </style>
    </footer>
  )
}