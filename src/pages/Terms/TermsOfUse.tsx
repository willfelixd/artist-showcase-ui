import { useTranslation } from 'react-i18next'
import {
  FileText,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'

export default function TermsOfUse() {

  const { t } = useTranslation()

  return (
    <main
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '48px 24px 80px',
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '14px',
          }}
        >
          <FileText
            size={30}
            strokeWidth={1.7}
            color="var(--accent-primary)"
          />
        </div>

        <h1
          className="text-gradient-section"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
            fontWeight: 600,
            textShadow: '0 2px 6px var(--shadow)',
            marginBottom: '12px',
          }}
        >
          {t('terms_of_use.title')}
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            textShadow: '0 2px 4px var(--shadow)',
            fontStyle: 'italic',
          }}
        >
          {t('terms_of_use.subtitle')}
        </p>
      </div>

      {/* Conteúdo */}
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: 'clamp(24px, 5vw, 40px)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {/* 1. Aceitação dos termos */}
        <Section
          icon={<ShieldCheck size={17} />}
          title={t('terms_of_use.sub_one.title')}
        >
          <p>
            {t('terms_of_use.sub_one.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_one.paragraph_two')}
          </p>
        </Section>

        {/* 2. Sobre o site */}
        <Section
          title={t('terms_of_use.sub_two.title')}
        >
          <p>
            {t('terms_of_use.sub_two.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_two.paragraph_two')}
          </p>
        </Section>

        {/* 3. Uso adequado */}
        <Section
          title={t('terms_of_use.sub_three.title')}
        >
          <p>
            {t('terms_of_use.sub_three.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_three.paragraph_two')}
          </p>

          <ul>
            <li>
              {t('terms_of_use.sub_three.paragraph_two_form.form_one')}
            </li>
            <li>
              {t('terms_of_use.sub_three.paragraph_two_form.form_two')}
            </li>
            <li>
              {t('terms_of_use.sub_three.paragraph_two_form.form_three')}
            </li>
            <li>
              {t('terms_of_use.sub_three.paragraph_two_form.form_four')}
            </li>
            <li>
              {t('terms_of_use.sub_three.paragraph_two_form.form_five')}
            </li>
          </ul>
        </Section>

        {/* 4. Propriedade intelectual */}
        <Section
          icon={<FileText size={17} />}
          title={t('terms_of_use.sub_four.title')}
        >
          <p>
            {t('terms_of_use.sub_four.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_four.paragraph_two')}
          </p>
        </Section>

        {/* 5. Links e serviços externos */}
        <Section
          icon={<ExternalLink size={17} />}
          title={t('terms_of_use.sub_five.title')}
        >
          <p>
            {t('terms_of_use.sub_five.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_five.paragraph_two')}
          </p>

          <p>
            {t('terms_of_use.sub_five.paragraph_three')}
          </p>
        </Section>

        {/* 6. Disponibilidade do site */}
        <Section
          icon={<AlertCircle size={17} />}
          title={t('terms_of_use.sub_six.title')}
        >
          <p>
            {t('terms_of_use.sub_six.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_six.paragraph_two')}
          </p>
        </Section>

        {/* 7. Informações de apresentações e eventos */}
        <Section
          title={t('terms_of_use.sub_seven.title')}
        >
          <p>
            {t('terms_of_use.sub_seven.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_seven.paragraph_two')}
          </p>
        </Section>

        {/* 8. Limitação de responsabilidade */}
        <Section
          title={t('terms_of_use.sub_eight.title')}
        >
          <p>
            {t('terms_of_use.sub_eight.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_eight.paragraph_two')}
          </p>
        </Section>

        {/* 9. Alterações dos termos */}
        <Section
          title={t('terms_of_use.sub_nine.title')}
        >
          <p>
            {t('terms_of_use.sub_nine.paragraph_one')}
          </p>

          <p>
            {t('terms_of_use.sub_nine.paragraph_two')}
          </p>
        </Section>

        {/* 10. Contato */}
        <Section
          title={t('terms_of_use.sub_ten.title')}
        >
          <p>
            {t('terms_of_use.sub_ten.paragraph_one')}
          </p>
        </Section>
      </div>

      {/* Responsividade */}
      <style>{`
        .terms-content p {
          margin: 0 0 14px;
        }

        @media (max-width: 600px) {
          main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </main>
  )
}

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section
      className="terms-content"
      style={{
        marginBottom: '32px',
      }}
    >
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '14px',
          textShadow: '0 2px 4px var(--shadow)',
        }}
      >
        {icon && (
          <span style={{ color: 'var(--accent-primary)' }}>
            {icon}
          </span>
        )}

        {title}
      </h2>

      <div
        style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          lineHeight: '1.8',
        }}
      >
        {children}
      </div>

      <style>{`
        ul {
          margin: 8px 0 16px;
          padding-left: 22px;
        }

        li {
          margin-bottom: 6px;
        }
      `}</style>
    </section>
  )
}