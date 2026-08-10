import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Lock, User, Music } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    try {
      await login(data)
      navigate('/admin/agendamentos')
    } catch {
      setError(t('admin.login.error'))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(transparent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      transition: 'var(--transition-theme)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}>
            <Music size={28} color="var(--accent-primary)" />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
            }}>
              Isa Tavres Cantora
            </span>
          </div>
          <p style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
            {t('admin.login.title')}
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Erro de login */}
          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(229, 57, 53, 0.1)',
              border: '1px solid #e53935',
              borderRadius: '8px',
              color: '#c62828',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          {/* Usuário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <User size={13} />
              {t('admin.login.username')}
            </label>
            <input
              {...register('username')}
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                outline: 'none',
              }}
              placeholder={t('placeholders.username')}
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            {errors.username && (
              <span style={{ color: '#e53935', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Senha */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Lock size={13} />
              {t('admin.login.password')}
            </label>
            <input
              {...register('password')}
              type="password"
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                outline: 'none',
              }}
              placeholder={t('placeholders.password')}
              onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            {errors.password && (
              <span style={{ color: '#e53935', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? 'var(--text-muted)' : 'var(--accent-primary)',
              color: 'var(--color-marfim)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => {
              if (!isSubmitting)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-hover)'
            }}
            onMouseLeave={e => {
              if (!isSubmitting)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--accent-primary)'
            }}
          >
            {isSubmitting ? '...' : t('admin.login.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}