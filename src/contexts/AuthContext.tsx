import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { authService } from '../services/authService'
import type { LoginRequest } from '../types'

interface AuthContextData {
  isAuthenticated: boolean
  username: string | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  )

  const isAuthenticated = !!username

  // Verifica se já tem token salvo ao carregar a aplicação
  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) setUsername(savedUsername)
  }, [])

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials)
    localStorage.setItem('token', response.token)
    localStorage.setItem('username', response.username)
    setUsername(response.username)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook customizado para usar o contexto
export function useAuth() {
  return useContext(AuthContext)
}