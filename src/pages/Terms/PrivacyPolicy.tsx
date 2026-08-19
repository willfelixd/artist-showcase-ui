import { ShieldCheck, Mail, Database, UserCheck } from 'lucide-react'

export default function PrivacyPolicy() {
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
          Política de Privacidade
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
          Última atualização: 17 de agosto de 2026
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
        <Section
          icon={<UserCheck size={17} />}
          title="1. Compromisso com a sua privacidade"
        >
          <p>
            A privacidade dos visitantes deste site é importante para nós.
            Esta Política de Privacidade explica de forma transparente quais
            informações podem ser coletadas por meio do site de Isa Tavares,
            como essas informações são utilizadas e quais são os direitos dos
            usuários.
          </p>

          <p>
            Ao utilizar os recursos disponibilizados neste site, o usuário
            declara estar ciente das práticas descritas nesta política.
          </p>
        </Section>

        <Section
          icon={<Database size={17} />}
          title="2. Informações coletadas"
        >
          <p>
            Quando você utiliza o formulário de contato disponível no site,
            podemos receber as seguintes informações fornecidas diretamente
            por você:
          </p>

          <ul>
            <li>Nome;</li>
            <li>Endereço de e-mail;</li>
            <li>Número de telefone, quando informado;</li>
            <li>Assunto da mensagem;</li>
            <li>Conteúdo da mensagem enviada.</li>
          </ul>

          <p>
            O fornecimento dessas informações ocorre de forma voluntária e é
            necessário para que possamos responder adequadamente às mensagens
            enviadas pelo formulário.
          </p>
        </Section>

        <Section
          icon={<Mail size={17} />}
          title="3. Como utilizamos suas informações"
        >
          <p>
            As informações fornecidas por meio do formulário de contato podem
            ser utilizadas para:
          </p>

          <ul>
            <li>Responder às mensagens enviadas pelo usuário;</li>
            <li>
              Entrar em contato a respeito de apresentações, shows ou eventos;
            </li>
            <li>
              Esclarecer dúvidas e fornecer informações solicitadas;
            </li>
            <li>
              Manter o funcionamento e a segurança dos recursos do site.
            </li>
          </ul>

          <p>
            Os dados não serão utilizados para finalidades incompatíveis com
            aquelas informadas nesta política.
          </p>
        </Section>

        <Section title="4. Compartilhamento de informações">
          <p>
            As informações enviadas pelo usuário são tratadas para possibilitar
            o atendimento da solicitação realizada por meio do site.
          </p>

          <p>
            Não comercializamos ou vendemos os dados pessoais fornecidos pelos
            usuários.
          </p>

          <p>
            Quando necessário para o funcionamento técnico do serviço,
            determinados dados poderão ser processados por fornecedores de
            infraestrutura ou serviços utilizados pelo site, sempre de acordo
            com suas respectivas finalidades e políticas aplicáveis.
          </p>
        </Section>

        <Section title="5. Armazenamento e segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger
            as informações recebidas por meio do site contra acesso não
            autorizado, alteração, divulgação ou destruição indevida.
          </p>

          <p>
            Apesar dos esforços empregados, nenhum sistema eletrônico pode ser
            considerado completamente imune a riscos de segurança.
          </p>
        </Section>

        <Section title="6. Retenção dos dados">
          <p>
            As informações poderão ser mantidas pelo período necessário para
            atender à finalidade para a qual foram fornecidas, cumprir
            obrigações legais ou preservar registros necessários à segurança e
            ao funcionamento do serviço.
          </p>
        </Section>

        <Section title="7. Direitos do usuário">
          <p>
            O usuário pode solicitar informações sobre o tratamento de seus
            dados pessoais e, quando aplicável, solicitar correção, atualização
            ou exclusão de informações pessoais.
          </p>

          <p>
            Para realizar uma solicitação relacionada à privacidade, entre em
            contato utilizando os canais disponibilizados neste site.
          </p>
        </Section>

        <Section title="8. Links externos">
          <p>
            Este site pode disponibilizar links para serviços e plataformas
            externas, como redes sociais e serviços de comunicação.
          </p>

          <p>
            Ao acessar esses serviços, o usuário estará sujeito às políticas de
            privacidade e aos termos de uso das respectivas plataformas.
          </p>
        </Section>

        <Section title="9. Alterações nesta política">
          <p>
            Esta Política de Privacidade poderá ser atualizada periodicamente
            para refletir alterações no funcionamento do site, nos serviços
            utilizados ou nas exigências legais aplicáveis.
          </p>

          <p>
            A versão mais recente estará sempre disponível nesta página.
          </p>
        </Section>

        <Section title="10. Contato">
          <p>
            Caso tenha dúvidas sobre esta Política de Privacidade ou sobre o
            tratamento de informações pessoais realizado por meio deste site,
            utilize a página de contato para enviar sua solicitação.
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