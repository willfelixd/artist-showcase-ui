import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react'
import { contactService } from '../../../services/contactService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import type { ContactMessage } from '../../../types'

export default function MessagesPage() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contactService.findAll()
      .then(data => setMessages(data.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        color: 'var(--text-primary)',
        fontWeight: '400',
        marginBottom: '32px',
      }}>
        {t('admin.dashboard.messages')}
      </h1>

      {messages.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Nenhuma mensagem recebida.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'var(--shadow)',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                <div>
                  <h3 style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {msg.subject}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      <Mail size={12} />
                      {msg.senderName} — {msg.senderEmail}
                    </span>
                    {msg.senderPhone && (
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--text-muted)',
                        fontSize: '13px',
                        fontFamily: 'var(--font-body)',
                      }}>
                        <Phone size={12} />
                        {msg.senderPhone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status do e-mail */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  color: msg.emailSent ? '#10b981' : '#ef4444',
                }}>
                  {msg.emailSent
                    ? <><CheckCircle size={14} /> E-mail enviado</>
                    : <><XCircle size={14} /> Falha no e-mail</>
                  }
                </div>
              </div>

              {/* Mensagem */}
              <p style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: '1.6',
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                marginBottom: '8px',
              }}>
                {msg.message}
              </p>

              {/* Data */}
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                fontFamily: 'var(--font-body)',
              }}>
                {new Date(msg.createdAt).toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}