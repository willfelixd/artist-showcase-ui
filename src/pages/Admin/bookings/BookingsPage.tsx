import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { bookingService } from '../../../services/bookingService'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import Pagination from '../../../components/ui/Pagination'
import { BackToTopButton } from '../../../components/ui/BackToTopButton'
import type { Booking, BookingStatus } from '../../../types'

const statusColors: Record<BookingStatus, string> = {
  PENDING: '#f59e0b',
  CONFIRMED: '#10b981',
  CANCELLED: '#ef4444',
}

export default function BookingsPage() {
  const { t } = useTranslation()

  const PAGE_SIZE = 5

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const bookingsRef = useRef<HTMLDivElement>(null)

  const fetchBookings = (pageNumber = 0) => {
    setLoading(true)

    bookingService
      .findAll(pageNumber, PAGE_SIZE)
      .then(data => {
        setBookings(data.content)
        setPage(pageNumber)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handlePageChange = (newPage: number) => {
    fetchBookings(newPage)

    bookingsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleStatusChange = async (
    id: number,
    status: BookingStatus
  ) => {
    setUpdatingId(id)

    try {
      const updated = await bookingService.updateStatus(id, status)

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? updated : booking
        )
      )
    } catch {
      alert('Erro ao atualizar status')
    } finally {
      setUpdatingId(null)
    }
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
        {t('admin.dashboard.bookings')}
      </h1>

      {bookings.length === 0 ? (
        <p
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            textShadow: '0 2px 4px var(--shadow)',
          }}
        >
          Nenhum agendamento encontrado.
        </p>
      ) : (
        <>
          {/* Lista de agendamentos */}
          <div ref={bookingsRef}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {bookings.map(booking => (
                <div
                  key={booking.id}
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
                    el.style.boxShadow =
                      '0 8px 24px rgba(0,0,0,0.12)'
                    el.style.borderColor =
                      'var(--accent-primary)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement

                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'var(--shadow)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  {/* Header do card */}
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
                          fontSize: '16px',
                          fontWeight: '600',
                          textShadow:
                            '0 2px 6px var(--shadow)',
                          marginBottom: '4px',
                        }}
                      >
                        {booking.eventName}
                      </h3>

                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          textShadow:
                            '0 2px 4px var(--shadow)',
                        }}
                      >
                        {booking.eventDate} •{' '}
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    {/* Badge de status */}
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textShadow:
                          '0 2px 4px var(--shadow)',
                        fontFamily: 'var(--font-body)',
                        backgroundColor:
                          `${statusColors[booking.status]}20`,
                        color:
                          statusColors[booking.status],
                        border:
                          `1px solid ${statusColors[booking.status]}40`,
                      }}
                    >
                      {t(
                        `admin.booking_status.${booking.status}`
                      )}
                    </span>
                  </div>

                  {/* Detalhes */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    {[
                      {
                        label: 'Solicitante',
                        value: booking.requesterName,
                      },
                      {
                        label: 'E-mail',
                        value: booking.requesterEmail,
                      },
                      {
                        label: 'Telefone',
                        value: booking.requesterPhone,
                      },
                      {
                        label: 'Local',
                        value: booking.location,
                      },
                    ].map(item => (
                      <div key={item.label}>
                        <p
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '11px',
                            textShadow:
                              '0 2px 4px var(--shadow)',
                            fontFamily: 'var(--font-body)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '2px',
                          }}
                        >
                          {item.label}
                        </p>

                        <p
                          style={{
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            textShadow:
                              '0 2px 4px var(--shadow)',
                            fontFamily: 'var(--font-body)',
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Notas */}
                  {booking.notes && (
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        fontFamily: 'var(--font-body)',
                        fontStyle: 'italic',
                        textShadow:
                          '0 2px 4px var(--shadow)',
                        marginBottom: '16px',
                        padding: '8px 12px',
                        backgroundColor:
                          'var(--bg-secondary)',
                        borderRadius: '6px',
                        border:
                          '1px solid var(--border)',
                      }}
                    >
                      {booking.notes}
                    </p>
                  )}

                  {/* Ações */}
                  {booking.status === 'PENDING' && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        onClick={() =>
                          handleStatusChange(
                            booking.id,
                            'CONFIRMED'
                          )
                        }
                        disabled={
                          updatingId === booking.id
                        }
                        className="booking-confirm-button"
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
                          textShadow:
                            '0 2px 4px var(--shadow)',
                          transition:
                            'all 0.60s ease',
                        }}
                      >
                        ✓ {t('admin.actions.confirm')}
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(
                            booking.id,
                            'CANCELLED'
                          )
                        }
                        disabled={
                          updatingId === booking.id
                        }
                        className="booking-cancel-button"
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'transparent',
                          color: '#ef4444',
                          border:
                            '1px solid #ef4444',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          textShadow:
                            '0 2px 4px var(--shadow)',
                          transition:
                            'all 0.60s ease',
                        }}
                      >
                        ✗ {t('admin.actions.cancel')}
                      </button>
                    </div>
                  )}

                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() =>
                        handleStatusChange(
                          booking.id,
                          'CANCELLED'
                        )
                      }
                      disabled={
                        updatingId === booking.id
                      }
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        color: '#ef4444',
                        border:
                          '1px solid #ef4444',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        textShadow:
                          '0 2px 4px var(--shadow)',
                      }}
                    >
                      ✗ Cancelar show
                    </button>
                  )}
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