import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react'
import { contactService } from '../../../services/contactService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import Pagination from '../../../components/ui/Pagination'
import { BackToTopButton } from '../../../components/ui/BackToTopButton'
import type { ContactMessage } from '../../../types'

export default function MessagesPage() {
  const { t } = useTranslation()

  const PAGE_SIZE = 5
  
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const messagesRef = useRef<HTMLDivElement>(null)

  const fetchMessages = (pageNumber = 0) => {
    setLoading(true)

    contactService.findAll(pageNumber, PAGE_SIZE)
      .then(data => {
        setMessages(data.content)
        setPage(pageNumber)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handlePageChange = (newPage: number) => {
    fetchMessages(newPage)

    messagesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          fontWeight: '400',
          textShadow: '0 2px 4px var(--shadow)',
          marginBottom: '32px',
        }}
      >
        {t('admin.dashboard.messages')}
      </h1>

      {messages.length === 0 ? (
        <p
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Nenhuma mensagem recebida.
        </p>
      ) : (
        <>
          <div ref={messagesRef}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: 'var(--shadow)',
                    transition:
                      'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                    el.style.borderColor = 'var(--accent-primary)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'var(--shadow)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          fontWeight: '600',
                          textShadow: '0 2px 6px var(--shadow)',
                          marginBottom: '4px',
                        }}
                      >
                        {msg.subject}
                      </h3>

                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--text-secondary)',
                            fontSize: '13px',
                            textShadow: '0 2px 4px var(--shadow)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          <Mail size={12} />
                          {msg.senderName} — {msg.senderEmail}
                        </span>

                        {msg.senderPhone && (
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: 'var(--text-muted)',
                              fontSize: '13px',
                              textShadow: '0 2px 4px var(--shadow)',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            <Phone size={12} />
                            {msg.senderPhone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status do e-mail */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        textShadow: '0 2px 4px var(--shadow)',
                        fontFamily: 'var(--font-body)',
                        color: msg.emailSent ? '#10b981' : '#ef4444',
                      }}
                    >
                      {msg.emailSent ? (
                        <>
                          <CheckCircle size={14} />
                          E-mail enviado
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          Falha no e-mail
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mensagem */}
                  <p
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      textShadow: '0 2px 4px var(--shadow)',
                      lineHeight: '1.6',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      marginBottom: '8px',
                    }}
                  >
                    {msg.message}
                  </p>

                  {/* Data */}
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '12px',
                      textShadow: '0 2px 4px var(--shadow)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {new Date(msg.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Paginação + voltar ao topo */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <div
              style={{
                position: 'absolute',
                right: 0,
              }}
            >
              <BackToTopButton />
            </div>
          </div>
        </>
      )}
    </div>
  )
}