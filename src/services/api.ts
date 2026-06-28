import axios from 'axios'

// Instância base do axios com a URL do backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de REQUEST
// Antes de cada requisição, anexa o token JWT se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de RESPONSE
// Se o backend retornar 401 (token expirado/inválido),
// limpa o token e redireciona para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api