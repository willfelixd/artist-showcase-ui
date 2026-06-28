import api from './api'
import type { LoginRequest, LoginResponse } from '../types'

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },
}