import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

const bookingSchema = z.object({
  requesterName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  requesterEmail: z.string().email('E-mail inválido'),
  requesterPhone: z.string().min(10, 'Telefone inválido'),
  eventName: z.string().min(3, 'Nome do evento deve ter pelo menos 3 caracteres'),
  startTime: z.string().min(1, 'Horário de início é obrigatório'),
  endTime: z.string().min(1, 'Horário de término é obrigatório'),
  location: z.string().min(3, 'Local deve ter pelo menos 3 caracteres'),
  notes: z.string().optional(),
}).refine(data => data.endTime > data.startTime, {
  message: 'Horário de término deve ser após o início',
  path: ['endTime'],
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  selectedDate: Date | undefined
  onSubmit: (data: BookingFormData & { eventDate: string }) => Promise<void>
  isSubmitting: boolean
}

// Componente de campo reutilizável
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        color: 'var(--text-secondary)',
        fontSize: '13px',
        fontFamily: 'var(--font-body)',
        fontWeight: '500',
      }}>
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

export function BookingForm({ selectedDate, onSubmit, isSubmitting }: BookingFormProps) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const handleFormSubmit = async (data: BookingFormData) => {
    if (!selectedDate) return

    await onSubmit({
      ...data,
      eventDate: format(selectedDate, 'yyyy-MM-dd'),
    })
    reset()
  }

  if (!selectedDate) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        textAlign: 'center',
        padding: '24px',
      }}>
           {t('schedule.select_date_hint')}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Data selecionada */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '8px',
        padding: '12px 16px',
        color: 'var(--accent-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        fontWeight: '500',
      }}>
        📅 {format(selectedDate, 'dd/MM/yyyy')}
      </div>

      {/* Dados do solicitante */}
      <Field label={t('schedule.form.name')} error={errors.requesterName?.message}>
        <input
          {...register('requesterName')}
          style={inputStyle}
          placeholder="João Silva"
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      <Field label={t('schedule.form.email')} error={errors.requesterEmail?.message}>
        <input
          {...register('requesterEmail')}
          type="email"
          style={inputStyle}
          placeholder="joao@email.com"
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      <Field label={t('schedule.form.phone')} error={errors.requesterPhone?.message}>
        <input
          {...register('requesterPhone')}
          style={inputStyle}
          placeholder="(11) 99999-9999"
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      <Field label={t('schedule.form.event_name')} error={errors.eventName?.message}>
        <input
          {...register('eventName')}
          style={inputStyle}
          placeholder="Casamento Silva"
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      {/* Horários */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        <Field label={t('schedule.form.start_time')} error={errors.startTime?.message}>
          <input
            {...register('startTime')}
            type="time"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </Field>

        <Field label={t('schedule.form.end_time')} error={errors.endTime?.message}>
          <input
            {...register('endTime')}
            type="time"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </Field>
      </div>

      <Field label={t('schedule.form.location')} error={errors.location?.message}>
        <input
          {...register('location')}
          style={inputStyle}
          placeholder="Salão de Festas, São Paulo"
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      <Field label={t('schedule.form.notes')} error={errors.notes?.message}>
        <textarea
          {...register('notes')}
          rows={3}
          style={{
            ...inputStyle,
            resize: 'vertical',
            lineHeight: '1.5',
          }}
          placeholder="Informações adicionais sobre o evento..."
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
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
      >
        {isSubmitting
          ? t('schedule.form.submitting')
          : t('schedule.form.submit')
        }
      </button>
    </form>
  )
}