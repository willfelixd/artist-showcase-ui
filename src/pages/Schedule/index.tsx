import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { bookingService } from '../../services/bookingService'
import { BookingCalendar } from './BookingCalendar'
import { BookingForm } from './BookingForm'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

type SubmitStatus = 'idle' | 'success' | 'conflict' | 'error'

export default function Schedule() {
  const { t } = useTranslation()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])
  const [loadingDates, setLoadingDates] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    bookingService.getUnavailableDates()
      .then(dates => {
        setUnavailableDates(dates.map(d => new Date(d + 'T12:00:00')))
      })
      .catch(() => {})
      .finally(() => setLoadingDates(false))
  }, [])

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await bookingService.create(data)
      setSubmitStatus('success')
      setSelectedDate(undefined)

      // Recarrega datas indisponíveis
      const dates = await bookingService.getUnavailableDates()
      setUnavailableDates(dates.map(d => new Date(d + 'T12:00:00')))

    } catch (error: any) {
      if (error.response?.status === 409) {
        setSubmitStatus('conflict')
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>
      
      {/* Título */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.0rem)',
          color: 'var(--text-primary)',
          fontWeight: 'bold',
          marginBottom: '12px',
        }}>
          {t('schedule.title')}
        </h1>
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
          {submitStatus === 'success' && `✅ ${t('schedule.success')}`}
          {submitStatus === 'conflict' && `⚠️ ${t('schedule.conflict')}`}
          {submitStatus === 'error' && `❌ ${t('common.error')}`}
        </div>
      )}

      {loadingDates ? (
        <LoadingSpinner />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
          className="schedule-grid"
        >
          {/* Calendário */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--text-primary)',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}>
              📅 {t('schedule.unavailable_dates')}
            </h2>
            <BookingCalendar
              selectedDate={selectedDate}
              unavailableDates={unavailableDates}
              onSelect={date => {
                setSelectedDate(date)
                setSubmitStatus('idle')
              }}
            />

            {/* Legenda */}
            <div style={{
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                }} />
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {t('schedule.selected_date')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-muted)',
                  opacity: 0.5,
                }} />
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {t('schedule.unavailable_date')}
                </span>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--text-primary)',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}>
              📋 {t('schedule.subtitle')}
            </h2>
            <BookingForm
              selectedDate={selectedDate}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .schedule-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}
      </style>
      
    </main>
  )
}