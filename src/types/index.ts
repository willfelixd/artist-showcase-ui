// Espelha os DTOs do backend

export interface Artist {
  id: number
  name: string
  bio: string
  profileImageUrl: string
  instagramUrl: string
  youtubeUrl: string
}

export interface Song {
  id: number
  title: string
  artist: string
  genre: string
  youtubeUrl: string | null
  mostRequested: boolean
}

export interface Video {
  id: number
  title: string
  description: string
  youtubeUrl: string
  youtubeVideoId: string
  thumbnailUrl: string
  embedUrl: string
  featured: boolean
  createdAt: string
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export interface Booking {
  id: number
  requesterName: string
  requesterEmail: string
  requesterPhone: string
  eventName: string
  eventDate: string
  startTime: string
  endTime: string
  location: string
  notes: string | null
  status: BookingStatus
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  id: number
  senderName: string
  senderEmail: string
  senderPhone: string | null
  subject: string
  message: string
  emailSent: boolean
  createdAt: string
}

// Resposta paginada do Spring Data
export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
}

// Auth
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  expiresIn: number
}