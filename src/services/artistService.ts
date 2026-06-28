import api from './api'
import type { Artist } from '../types'

export const artistService = {
  getProfile: async (): Promise<Artist> => {
    const { data } = await api.get('/artist')
    return data
  },

  updateProfile: async (artist: Partial<Artist>): Promise<Artist> => {
    const { data } = await api.put('/artist', artist)
    return data
  },
}