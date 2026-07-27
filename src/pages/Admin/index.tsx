import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoginPage from './LoginPage'
import AdminLayout from './layout/AdminLayout'
import BookingsPage from './bookings/BookingsPage'
import SongsPage from './songs/SongsPage'
import VideosPage from './videos/VideosPage'
import MessagesPage from './messages/MessagesPage'

export default function Admin() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="login"
        element={
          isAuthenticated
            ? <Navigate to="/admin/agendamentos" replace />
            : <LoginPage />
        }
      />
      <Route
        path="/*"
        element={
          isAuthenticated
            ? <AdminLayout />
            : <Navigate to="/admin/login" replace />
        }
      >
        <Route path="agendamentos" element={<BookingsPage />} />
        <Route path="musicas" element={<SongsPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="mensagens" element={<MessagesPage />} />
        <Route index element={<Navigate to="agendamentos" replace />} />
      </Route>
    </Routes>
  )
}