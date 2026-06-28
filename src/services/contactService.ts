import api from './api'
import type { ContactMessage, Page } from '../types'

interface ContactRequest {
  senderName: string
  senderEmail: string
  senderPhone?: string
  subject: string
  message: string
}

export const contactService = {
  send: async (contact: ContactRequest): Promise<ContactMessage> => {
    const { data } = await api.post('/contact', contact)
    return data
  },

  findAll: async (page = 0, size = 20): Promise<Page<ContactMessage>> => {
    const { data } = await api.get('/contact', { params: { page, size } })
    return data
  },
}