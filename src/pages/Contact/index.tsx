import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, User, MessageSquare, Send } from 'lucide-react'
import { contactService } from '../../services/contactService'

const contactSchema = z.object({
  senderName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  senderEmail: z.string().email('E-mail inválido'),
  senderPhone: z.string().optional(),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(2000, 'Mensagem muito longa'),
})

type ContactFormData = z.infer<typeof contactSchema>

type SubmitStatus = 'idle' | 'success' | 'rate_limit' | 'error'

// Campo reutilizável
function Field({
  label,
  error,
  icon,
  children,
}: {
  label: string
  error?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        color: 'var(--text-secondary)',
        fontSize: '13px',
        fontFamily: 'var(--font-body)',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <span style={{
          color: '#e53935',
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

const inputStyle = {
  padding: '10px 14px',
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s ease',
}

export default function Contact() {
  const { t } = useTranslation()
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle')
    try {
      await contactService.send(data)
      setSubmitStatus('success')
      reset()
    } catch (error: any) {
      if (error.response?.status === 429) {
        setSubmitStatus('rate_limit')
      } else {
        setSubmitStatus('error')
      }
    }
  }

  return (
    <main style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>

      {/* Título */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--text-primary)',
          fontWeight: '400',
          marginBottom: '12px',
        }}>
          {t('contact.title')}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
        }}>
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Feedback de status */}
      {submitStatus !== 'idle' && (
        <div style={{
          marginBottom: '32px',
          padding: '16px 20px',
          borderRadius: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          backgroundColor: submitStatus === 'success'
            ? 'rgba(76, 175, 80, 0.1)'
            : 'rgba(229, 57, 53, 0.1)',
          border: `1px solid ${submitStatus === 'success' ? '#4caf50' : '#e53935'}`,
          color: submitStatus === 'success' ? '#2e7d32' : '#c62828',
        }}>
          {submitStatus === 'success' && `✅ ${t('contact.success')}`}
          {submitStatus === 'rate_limit' && `⏳ ${t('contact.rate_limit')}`}
          {submitStatus === 'error' && `❌ ${t('contact.error')}`}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Nome e Email lado a lado no desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
          className="contact-grid"
        >
          <Field
            label={t('contact.form.name')}
            error={errors.senderName?.message}
            icon={<User size={13} />}
          >
            <input
              {...register('senderName')}
              style={inputStyle}
              placeholder="João Silva"
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </Field>

          <Field
            label={t('contact.form.email')}
            error={errors.senderEmail?.message}
            icon={<Mail size={13} />}
          >
            <input
              {...register('senderEmail')}
              type="email"
              style={inputStyle}
              placeholder="joao@email.com"
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </Field>
        </div>

        <Field
          label={t('contact.form.phone')}
          error={errors.senderPhone?.message}
          icon={<Phone size={13} />}
        >
          <input
            {...register('senderPhone')}
            style={inputStyle}
            placeholder="(11) 99999-9999"
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </Field>

        <Field
          label={t('contact.form.subject')}
          error={errors.subject?.message}
          icon={<MessageSquare size={13} />}
        >
          <input
            {...register('subject')}
            style={inputStyle}
            placeholder="Orçamento para evento"
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </Field>

        <Field
          label={t('contact.form.message')}
          error={errors.message?.message}
        >
          <textarea
            {...register('message')}
            rows={5}
            style={{
              ...inputStyle,
              resize: 'vertical',
              lineHeight: '1.6',
            }}
            placeholder="Olá! Gostaria de saber sobre..."
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: isSubmitting ? 'var(--text-muted)' : 'var(--accent-primary)',
            color: 'var(--color-marfim)',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 24px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => {
            if (!isSubmitting)
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-hover)'
          }}
          onMouseLeave={e => {
            if (!isSubmitting)
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-primary)'
          }}
        >
          <Send size={16} />
          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </button>
      </form>

      {/* Responsividade */}
      <style>{`
        @media (max-width: 600px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}