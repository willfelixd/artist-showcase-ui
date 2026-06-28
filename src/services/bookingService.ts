import api from './api'
import type { Booking, BookingStatus, Page } from '../types'

interface BookingRequest {
  requesterName: string
  requesterEmail: string
  requesterPhone: string
  eventName: string
  eventDate: string
  startTime: string
  endTime: string
  location: string
  notes?: string
}

export const bookingService = {
  create: async (booking: BookingRequest): Promise<Booking> => {
    const { data } = await api.post('/bookings', booking)
    return data
  },

  getUnavailableDates: async (): Promise<string[]> => {
    const { data } = await api.get('/bookings/unavailable-dates')
    return data
  },

  findAll: async (page = 0, size = 20): Promise<Page<Booking>> => {
    const { data } = await api.get('/bookings', { params: { page, size } })
    return data
  },

  updateStatus: async (id: number, status: BookingStatus): Promise<Booking> => {
    const { data } = await api.patch(`/bookings/${id}/status`, { status })
    return data
  },
}