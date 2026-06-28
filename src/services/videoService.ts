import api from './api'
import type { Video, Page } from '../types'

interface VideoRequest {
  title: string
  description?: string
  youtubeUrl: string
  featured: boolean
}

export const videoService = {
  findAll: async (page = 0, size = 12): Promise<Page<Video>> => {
    const { data } = await api.get('/videos', { params: { page, size } })
    return data
  },

  findFeatured: async (): Promise<Page<Video>> => {
    const { data } = await api.get('/videos/featured')
    return data
  },

  create: async (video: VideoRequest): Promise<Video> => {
    const { data } = await api.post('/videos', video)
    return data
  },

  update: async (id: number, video: VideoRequest): Promise<Video> => {
    const { data } = await api.put(`/videos/${id}`, video)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/videos/${id}`)
  },
}