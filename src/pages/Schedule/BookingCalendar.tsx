import { DayPicker } from 'react-day-picker'
import { ptBR, enUS } from 'react-day-picker/locale'
import { useLanguage } from '../../contexts/LanguageContext'
import 'react-day-picker/style.css'

interface BookingCalendarProps {
  selectedDate: Date | undefined
  unavailableDates: Date[]
  onSelect: (date: Date | undefined) => void
}

export function BookingCalendar({
  selectedDate,
  unavailableDates,
  onSelect,
}: BookingCalendarProps) {
  const { language } = useLanguage()

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: 'var(--shadow)',
    }}>
      <style>{`
        .rdp-root {
          --rdp-accent-color: var(--accent-primary);
          --rdp-accent-background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-family: var(--font-body);
        }
        .rdp-day_button {
          color: var(--text-primary);
        }
        .rdp-selected .rdp-day_button {
          background-color: var(--accent-primary);
          color: var(--color-marfim);
        }
        .rdp-disabled .rdp-day_button {
          color: var(--text-muted);
          text-decoration: line-through;
          opacity: 0.5;
        }
        .rdp-outside .rdp-day_button {
          color: var(--text-muted);
          opacity: 0.4;
        }
        .rdp-chevron {
          fill: var(--accent-primary);
        }
        .rdp-month_caption {
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .rdp-weekday {
          color: var(--text-muted);
          font-size: 13px;
        }
      `}</style>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        locale={language === 'pt-BR' ? ptBR : enUS}
        disabled={[
          { before: new Date() }, // bloqueia datas passadas
          ...unavailableDates,    // bloqueia datas com shows confirmados
        ]}
        modifiersStyles={{
          disabled: { cursor: 'not-allowed' },
        }}
      />
    </div>
  )
}