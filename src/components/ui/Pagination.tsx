import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {

    if (totalPages <= 1) {
        return null
    }

    const getPages = (): (number | 'ellipsis')[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i)
        }

        const pages: (number | 'ellipsis')[] = []

        pages.push(0)

        if (page > 2) {
            pages.push('ellipsis')
        }

        const start = Math.max(1, page - 1)
        const end = Math.min(totalPages - 2, page + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (page < totalPages - 3) {
            pages.push('ellipsis')
        }

        pages.push(totalPages - 1)

        return pages
    }

    const pages = getPages()

    const isFirstPage = page === 0
    const isLastPage = page === totalPages - 1

    const { t } = useTranslation()

    return (
        <nav
            aria-label="Paginação"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px',
                    background: 'color-mix(in srgb, var(--bg-secondary) 88%, transparent)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    boxShadow: '0 8px 24px var(--shadow)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                }}
            >

                {/* Anterior */}
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={isFirstPage}
                    aria-label="Página anterior"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        minWidth: '40px',
                        height: '40px',
                        padding: '0 10px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '10px',
                        color: isFirstPage
                            ? 'var(--text-muted)'
                            : 'var(--text-primary)',
                        cursor: isFirstPage ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: '500',
                        opacity: isFirstPage ? 0.5 : 1,
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (!isFirstPage) {
                            e.currentTarget.style.color = 'var(--accent-primary)'
                            e.currentTarget.style.background = 'var(--bg-primary)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = isFirstPage
                            ? 'var(--text-muted)'
                            : 'var(--text-primary)'
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.transform = 'translateY(0)'
                    }}
                >
                    <ChevronLeft size={18} strokeWidth={2} />

                    <span
                        className="pagination-label"
                    >
                        {t('common.previous_button')}
                    </span>
                </button>

                {/* Páginas */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    {pages.map((item, index) => {

                        if (item === 'ellipsis') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    aria-hidden="true"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '40px',
                                        color: 'var(--text-muted)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '14px',
                                        userSelect: 'none',
                                    }}
                                >
                                    •••
                                </span>
                            )
                        }

                        const isActive = item === page

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onPageChange(item)}
                                aria-label={`Página ${item + 1}`}
                                aria-current={isActive ? 'page' : undefined}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    background: isActive
                                        ? 'var(--pink-gradient)'
                                        : 'transparent',
                                    border: isActive
                                        ? '1px solid transparent'
                                        : '1px solid transparent',
                                    borderRadius: '10px',
                                    color: isActive
                                        ? 'var(--color-marfim)'
                                        : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '14px',
                                    fontWeight: isActive ? '600' : '500',
                                    textShadow: isActive
                                        ? '0 2px 4px var(--shadow)'
                                        : 'none',
                                    boxShadow: isActive
                                        ? '0 4px 12px color-mix(in srgb, var(--accent-primary) 25%, transparent)'
                                        : 'none',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = 'var(--accent-primary)'
                                        e.currentTarget.style.background = 'var(--bg-primary)'
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                    } else {
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                        e.currentTarget.style.boxShadow =
                                            '0 6px 16px color-mix(in srgb, var(--accent-primary) 35%, transparent)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = isActive
                                        ? 'var(--color-marfim)'
                                        : 'var(--text-primary)'
                                    e.currentTarget.style.background = isActive
                                        ? 'var(--pink-gradient)'
                                        : 'transparent'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = isActive
                                        ? '0 4px 12px color-mix(in srgb, var(--accent-primary) 25%, transparent)'
                                        : 'none'
                                }}
                            >
                                {item + 1}
                            </button>
                        )
                    })}
                </div>

                {/* Próxima */}
                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={isLastPage}
                    aria-label="Próxima página"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        minWidth: '40px',
                        height: '40px',
                        padding: '0 10px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '10px',
                        color: isLastPage
                            ? 'var(--text-muted)'
                            : 'var(--text-primary)',
                        cursor: isLastPage ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: '500',
                        opacity: isLastPage ? 0.5 : 1,
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (!isLastPage) {
                            e.currentTarget.style.color = 'var(--accent-primary)'
                            e.currentTarget.style.background = 'var(--bg-primary)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = isLastPage
                            ? 'var(--text-muted)'
                            : 'var(--text-primary)'
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.transform = 'translateY(0)'
                    }}
                >
                    <span
                        className="pagination-label"
                    >
                        {t('common.next_button')}
                    </span>

                    <ChevronRight size={18} strokeWidth={2} />
                </button>

            </div>
        </nav>
    )
}