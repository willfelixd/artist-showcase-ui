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
      backgroundColor: 'var(--bg-primary)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: 'var(--shadow)',
    }}>
      <style>{`
        .rdp-root {
          --rdp-accent-color: var(--accent-primary);
          --rdp-accent-background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
          textShadow: 0 2px 4px var(--shadow);
        }
        .rdp-day_button {
          color: var(--text-primary);
          textShadow: 0 2px 4px var(--shadow);
        }
        .rdp-selected .rdp-day_button {
          background: var(--pink-gradient);
          color: var(--text-primary);
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
          font-family: var(--font-display);
          textShadow: 0 2px 4px var(--shadow);
          background: linear-gradient(
            90deg,
            var(--text-primary),
            var(--accent-primary),
            var(--text-primary)
          );

          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;

          background-size: 200% auto;
          animation: gradientSection 6s ease-in-out infinite;
        }

        @keyframes gradientSection {
          0% {
            background-position: 0% center;
          }

          50% {
            background-position: 100% center;
          }

          100% {
            background-position: 0% center;
          }
        }
        .rdp-weekday {
          color: var(--text-muted);
          font-size: 13px;
          textShadow: '0 2px 4px var(--shadow)';
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