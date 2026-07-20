import api from './api'
import type { Song, Page } from '../types'

interface SongFilters {
  title?: string
  genre?: string
  page?: number
  size?: number
}

interface SongRequest {
  title: string
  artist: string
  genre: string
  youtubeUrl?: string
  mostRequested: boolean
}

export const songService = {
  findAll: async (filters: SongFilters = {}): Promise<Page<Song>> => {
    // Remove strings vazias — backend espera null para ignorar filtro
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => {
        if (typeof v === 'string') return v.trim() !== ''
        return v !== undefined && v !== null
      })
    )
    const { data } = await api.get('/songs', { params })
    return data
  },

  findMostRequested: async (): Promise<Page<Song>> => {
    const { data } = await api.get('/songs/most-requested')
    return data
  },

  create: async (song: SongRequest): Promise<Song> => {
    const { data } = await api.post('/songs', song)
    return data
  },

  update: async (id: number, song: SongRequest): Promise<Song> => {
    const { data } = await api.put(`/songs/${id}`, song)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/songs/${id}`)
  },
}