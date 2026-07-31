import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { bookingService } from '../../../services/bookingService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import type { Booking, BookingStatus } from '../../../types'

const statusColors: Record<BookingStatus, string> = {
  PENDING: '#f59e0b',
  CONFIRMED: '#10b981',
  CANCELLED: '#ef4444',
}

export default function BookingsPage() {
  const { t } = useTranslation()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetchBookings = () => {
    setLoading(true)
    bookingService.findAll()
      .then(data => setBookings(data.content))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleStatusChange = async (id: number, status: BookingStatus) => {
    setUpdatingId(id)
    try {
      const updated = await bookingService.updateStatus(id, status)
      setBookings(prev => prev.map(b => b.id === id ? updated : b))
    } catch {
      alert('Erro ao atualizar status')
    } finally {
      setUpdatingId(null)
    }
  }

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
        {t('admin.dashboard.bookings')}
      </h1>

      {bookings.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Nenhum agendamento encontrado.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map(booking => (
            <div
              key={booking.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'var(--shadow)',
              }}
            >
              {/* Header do card */}
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
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {booking.eventName}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                  }}>
                    {booking.eventDate} • {booking.startTime} - {booking.endTime}
                  </p>
                </div>

                {/* Badge de status */}
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-body)',
                  backgroundColor: `${statusColors[booking.status]}20`,
                  color: statusColors[booking.status],
                  border: `1px solid ${statusColors[booking.status]}40`,
                }}>
                  {t(`admin.booking_status.${booking.status}`)}
                </span>
              </div>

              {/* Detalhes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '8px',
                marginBottom: '16px',
              }}>
                {[
                  { label: 'Solicitante', value: booking.requesterName },
                  { label: 'E-mail', value: booking.requesterEmail },
                  { label: 'Telefone', value: booking.requesterPhone },
                  { label: 'Local', value: booking.location },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-body)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '2px',
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Notas */}
              {booking.notes && (
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                }}>
                  {booking.notes}
                </p>
              )}

              {/* Ações */}
              {booking.status === 'PENDING' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                    disabled={updatingId === booking.id}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    ✓ {t('admin.actions.confirm')}
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                    disabled={updatingId === booking.id}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                    }}
                  >
                    ✗ {t('admin.actions.cancel')}
                  </button>
                </div>
              )}

              {booking.status === 'CONFIRMED' && (
                <button
                  onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                  disabled={updatingId === booking.id}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                  }}
                >
                  ✗ Cancelar show
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}