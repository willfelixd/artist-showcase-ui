import { ArrowUp } from 'lucide-react'

export function BackToTopButton() {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            className="back-to-top-button"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                flexShrink: 0,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background:
                    'linear-gradient(145deg, var(--bg-card), var(--bg-secondary))',
                color: 'var(--text-primary)',
                boxShadow: '0 6px 18px var(--shadow)',
                cursor: 'pointer',
                transition:
                    'transform 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
                const button = e.currentTarget

                button.style.color = 'var(--accent-primary)'
                button.style.borderColor = 'var(--accent-primary)'
                button.style.transform = 'translateY(-3px)'
                button.style.boxShadow =
                    '0 8px 22px var(--shadow), 0 0 16px var(--accent-primary)'
            }}
            onMouseLeave={e => {
                const button = e.currentTarget

                button.style.color = 'var(--text-primary)'
                button.style.borderColor = 'var(--border)'
                button.style.transform = 'translateY(0)'
                button.style.boxShadow = '0 6px 18px var(--shadow)'
            }}
        >
            <ArrowUp
                size={19}
                strokeWidth={2.2}
            />

            <style>{`
        @media (min-width: 768px) {
          .back-to-top-button {
            display: none !important;
          }
        }
      `}</style>
        </button>
    )
}