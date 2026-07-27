import { useTranslation } from 'react-i18next'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '48px',
      color: 'var(--text-secondary)',
    }}>
      <p>{message || t('common.error')}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--color-marfim)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}