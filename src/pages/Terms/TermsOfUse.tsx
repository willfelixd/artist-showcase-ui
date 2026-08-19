import {
  FileText,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'

export default function TermsOfUse() {
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
          Termos de Uso
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
          icon={<ShieldCheck size={17} />}
          title="1. Aceitação dos termos"
        >
          <p>
            Ao acessar e utilizar este site, você concorda com estes Termos de
            Uso e se compromete a utilizá-lo de acordo com as condições aqui
            estabelecidas.
          </p>

          <p>
            Caso não concorde com algum dos termos apresentados, recomendamos
            que não utilize os recursos disponibilizados pelo site.
          </p>
        </Section>

        <Section title="2. Sobre o site">
          <p>
            Este site tem como finalidade apresentar o trabalho artístico de
            Isa Tavares, incluindo informações sobre sua carreira, repertório,
            vídeos, apresentações, agenda e formas de contato.
          </p>

          <p>
            As informações disponibilizadas podem ser atualizadas ou
            modificadas sem aviso prévio para manter o conteúdo do site
            atualizado.
          </p>
        </Section>

        <Section title="3. Uso adequado">
          <p>
            O usuário concorda em utilizar o site de maneira legal, responsável
            e compatível com sua finalidade.
          </p>

          <p>Não é permitido utilizar o site para:</p>

          <ul>
            <li>
              Praticar atividades que violem leis ou regulamentos aplicáveis;
            </li>
            <li>
              Tentar obter acesso não autorizado a sistemas ou informações;
            </li>
            <li>
              Interferir no funcionamento normal do site;
            </li>
            <li>
              Utilizar o conteúdo do site para finalidades ilícitas;
            </li>
            <li>
              Reproduzir ou distribuir conteúdo protegido sem autorização.
            </li>
          </ul>
        </Section>

        <Section
          icon={<FileText size={17} />}
          title="4. Propriedade intelectual"
        >
          <p>
            Os textos, imagens, vídeos, elementos visuais, identidade gráfica,
            logotipo e demais conteúdos disponibilizados neste site podem estar
            protegidos pela legislação aplicável de propriedade intelectual.
          </p>

          <p>
            A utilização de qualquer conteúdo além do permitido pela legislação
            aplicável depende de autorização do respectivo titular dos direitos.
          </p>
        </Section>

        <Section
          icon={<ExternalLink size={17} />}
          title="5. Links e serviços externos"
        >
          <p>
            O site pode apresentar links para plataformas externas, incluindo
            redes sociais, serviços de vídeo e aplicativos de comunicação.
          </p>

          <p>
            Esses serviços são operados por terceiros e possuem seus próprios
            termos de uso e políticas de privacidade.
          </p>

          <p>
            O acesso e a utilização dessas plataformas estão sujeitos às regras
            estabelecidas por seus respectivos operadores.
          </p>
        </Section>

        <Section
          icon={<AlertCircle size={17} />}
          title="6. Disponibilidade do site"
        >
          <p>
            Embora sejam adotados esforços para manter o site disponível e
            funcionando corretamente, não é possível garantir que o serviço
            estará permanentemente livre de interrupções, falhas técnicas ou
            indisponibilidades.
          </p>

          <p>
            Recursos, páginas e funcionalidades podem ser modificados,
            suspensos ou removidos quando necessário.
          </p>
        </Section>

        <Section title="7. Informações de apresentações e eventos">
          <p>
            Informações relacionadas a shows, apresentações, disponibilidade,
            valores, datas e condições de contratação podem estar sujeitas a
            alterações e confirmação prévia.
          </p>

          <p>
            O envio de uma mensagem ou solicitação pelo site não representa,
            por si só, a confirmação de uma contratação ou reserva de data.
          </p>
        </Section>

        <Section title="8. Limitação de responsabilidade">
          <p>
            O conteúdo do site é disponibilizado com o objetivo de apresentar
            informações sobre o trabalho artístico e facilitar o contato com
            Isa Tavares.
          </p>

          <p>
            Não nos responsabilizamos por indisponibilidades, alterações ou
            informações apresentadas em plataformas externas vinculadas ao
            site.
          </p>
        </Section>

        <Section title="9. Alterações dos termos">
          <p>
            Estes Termos de Uso poderão ser atualizados sempre que necessário
            para refletir mudanças no site, nos serviços disponibilizados ou nas
            obrigações legais aplicáveis.
          </p>

          <p>
            A versão atualizada estará disponível nesta página.
          </p>
        </Section>

        <Section title="10. Contato">
          <p>
            Caso tenha dúvidas sobre estes Termos de Uso, você pode entrar em
            contato utilizando o formulário disponível na página de contato.
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