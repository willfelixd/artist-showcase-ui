import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Lock, User, Music, Eye, EyeClosed } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)

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
            <span className="text-gradient-section"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                lineHeight: '1.2',
                letterSpacing: '-0.7px',
                textShadow: '0 2px 6px var(--shadow)',
              }}>
              Isa Tavares Cantora
            </span>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            textShadow: '0 2px 4px var(--shadow)',
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
              textShadow: '0 2px 4px var(--shadow)',
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
              textShadow: '0 2px 4px var(--shadow)',
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
                textShadow: '0 2px 4px var(--shadow)',
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
            <label
              style={{
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                textShadow: '0 2px 4px var(--shadow)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Lock size={13} />
              {t('admin.login.password')}
            </label>

            <div style={{ position: 'relative' }}>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                style={{
                  width: '100%',
                  padding: '10px 42px 10px 14px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  textShadow: '0 2px 4px var(--shadow)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                placeholder={t('placeholders.password')}
                onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <span
                style={{
                  color: '#e53935',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? 'var(--text-muted)' : 'var(--pink-gradient)',
              color: 'var(--color-marfim)',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 24px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: '500',
              textShadow: '0 2px 4px var(--shadow)',
              transition: 'all 0.3s ease',
              boxShadow: '0 3px 8px var(--shadow)',
            }}
            onMouseEnter={e => {
              if (!isSubmitting) {
                const button = e.currentTarget as HTMLButtonElement

                button.style.background =
                  'linear-gradient(135deg, color-mix(in srgb, var(--accent-hover) 85%, white) 0%, var(--accent-hover) 100%)'

                button.style.transform = 'translateY(-1px)'
                button.style.boxShadow = '0 5px 14px var(--shadow)'
              }
            }}
            onMouseLeave={e => {
              if (!isSubmitting) {
                const button = e.currentTarget as HTMLButtonElement

                button.style.background = 'var(--pink-gradient)'

                button.style.transform = 'translateY(0)'
                button.style.boxShadow = '0 3px 8px var(--shadow)'
              }
            }}
          >
            {isSubmitting ? '...' : t('admin.login.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}