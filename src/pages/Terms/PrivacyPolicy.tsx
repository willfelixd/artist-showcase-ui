import { ShieldCheck, Mail, Database, UserCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {

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
          <ShieldCheck
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
          {t('privacy_policy.title')}
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
          {t('privacy_policy.subtitle')}
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
        {/* 1. Compromisso com a sua privacidade */}
        <Section
          icon={<UserCheck size={17} />}
          title={t('privacy_policy.sub_one.title')}
        >
          <p>
            {t('privacy_policy.sub_one.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_one.paragraph_two')}
          </p>
        </Section>

        {/* 2. Informações coletadas */}
        <Section
          icon={<Database size={17} />}
          title={t('privacy_policy.sub_two.title')}
        >
          <p>
            {t('privacy_policy.sub_two.paragraph_one')}
          </p>

          <ul>
            <li>{t('privacy_policy.sub_two.paragraph_one_form.name')}</li>
            <li>{t('privacy_policy.sub_two.paragraph_one_form.email')}</li>
            <li>{t('privacy_policy.sub_two.paragraph_one_form.phone')}</li>
            <li>{t('privacy_policy.sub_two.paragraph_one_form.subject')}</li>
            <li>{t('privacy_policy.sub_two.paragraph_one_form.message')}</li>
          </ul>

          <p>
            {t('privacy_policy.sub_two.paragraph_two')}
          </p>
        </Section>

        {/* 3. Como utilizamos suas informações */}
        <Section
          icon={<Mail size={17} />}
          title={t('privacy_policy.sub_three.title')}
        >
          <p>
            {t('privacy_policy.sub_three.paragraph_one')}
          </p>

          <ul>
            <li>{t('privacy_policy.sub_three.paragraph_one_form.form_one')}</li>
            <li>{t('privacy_policy.sub_three.paragraph_one_form.form_two')}</li>
            <li>{t('privacy_policy.sub_three.paragraph_one_form.form_three')}</li>
            <li>{t('privacy_policy.sub_three.paragraph_one_form.form_four')}</li>
          </ul>

          <p>
            {t('privacy_policy.sub_three.paragraph_two')}
          </p>
        </Section>

        {/* 4. Compartilhamento de informações */}
        <Section
          title={t('privacy_policy.sub_four.title')}
        >
          <p>
            {t('privacy_policy.sub_four.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_four.paragraph_two')}
          </p>

          <p>
            {t('privacy_policy.sub_four.paragraph_three')}
          </p>
        </Section>

        {/* 5. Armazenamento e segurança */}
        <Section
          title={t('privacy_policy.sub_five.title')}
        >
          <p>
            {t('privacy_policy.sub_five.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_five.paragraph_two')}
          </p>
        </Section>

        {/* 6. Retenção dos dados */}
        <Section
          title={t('privacy_policy.sub_six.title')}
        >
          <p>
            {t('privacy_policy.sub_six.paragraph_one')}
          </p>
        </Section>

        {/* 7. Direitos do usuário */}
        <Section
          title={t('privacy_policy.sub_seven.title')}
        >
          <p>
            {t('privacy_policy.sub_seven.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_seven.paragraph_two')}
          </p>
        </Section>

        {/* 8. Links externos */}
        <Section
          title={t('privacy_policy.sub_eight.title')}
        >
          <p>
            {t('privacy_policy.sub_eight.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_eight.paragraph_two')}
          </p>
        </Section>

        {/* 9. Alterações nesta política */}
        <Section
          title={t('privacy_policy.sub_nine.title')}
        >
          <p>
            {t('privacy_policy.sub_nine.paragraph_one')}
          </p>

          <p>
            {t('privacy_policy.sub_nine.paragraph_two')}
          </p>
        </Section>

        {/* 10. Contato */}
        <Section
          title={t('privacy_policy.sub_ten.title')}
        >
          <p>
            {t('privacy_policy.sub_ten.paragraph_one')}
          </p>
        </Section>
      </div>

      {/* Responsividade */}
      <style>{`
        .privacy-content p {
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
      className="privacy-content"
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