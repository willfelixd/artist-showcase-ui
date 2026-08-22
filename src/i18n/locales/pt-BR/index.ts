const ptBR = {
  // Navegação
  nav: {
    home: 'Início',
    repertoire: 'Repertório',
    videos: 'Vídeos',
    schedule: 'Agenda',
    contact: 'Contato',
    admin: 'Admin',
  },

  // Footer
  footer: {
    message: 'Voz, música e momentos inesquecíveis para tornar cada evento ainda mais especial.',
    follow: 'Siga a Isa',
    event: 'Seu evento merece música',
    contact: 'Entre em contato e saiba mais sobre shows e apresentações.',
    button: 'Fale com a Isa',
    rights_reserved: 'Todos os direitos reservados.',
    developed_by: 'Desenvolvido por',
    privacy_policy: 'Política de Privacidade',
    terms_use: 'Termos de Uso',
  },
  
  // Página Home
  home: {
    hero: {
      greeting: 'Bem-vindo ao portfólio de',
      cta_schedule: 'Agendar Show',
      cta_repertoire: 'Ver Repertório',
      cta_contact: 'Entre em Contato',
    },
    sections: {
      about: {
        label: 'Sobre mim',
        bio: `"Nasci para transformar sentimentos em melodias. Com uma voz que transita entre a suavidade do acústico e a alma do sertanejo, construo canções que chegam devagar e ficam para sempre.  
        Apaixonada pela música desde cedo, encontro no violão e na voz a forma mais verdadeira de me expressar. Cada apresentação é um convite à emoção e ao encontro entre artista e quem ouve.
        Minha música não segue fórmulas. Segue o coração."`,
      },
      scroll_hint: 'Clique aqui ou role para ver mais',
      scroll_top: 'Clique aqui para voltar ao topo',
      mostRequested: 'Músicas em Destaque',
      featured_videos: 'Vídeos em Destaque',
    },
  },

  // Página Repertório
  repertoire: {
    title: 'Repertório',
    available_count: '{{count}} músicas disponíveis',
    search_placeholder: 'Buscar música...',
    filter_genre: 'Filtrar por gênero',
    all_genres: 'Todos os gêneros',
    most_requested: 'Top 10 Músicas Mais Pedidas',
    full_repertoire: 'Repertório Completo',
    no_results: 'Nenhuma música encontrada.',
    load_more: 'Carregar mais',
  },

  // Página Vídeos
  videos: {
    title: 'Vídeos',
    available_count: '{{count}} vídeos disponíveis',
    featured: 'Top 6 Vídeos Em Destaque',
    all_videos: 'Todos os Vídeos',
    no_videos: 'Nenhum vídeo disponível.',
    load_more: 'Carregar mais',
    watch: 'Assistir',
  },

  // Página Agenda
  schedule: {
    title: 'Agenda',
    subtitle: 'Solicite um Show',
    selected_date: 'Data selecionada',
    unavailable_date: 'Data indisponível',
    select_date_hint: 'Selecione uma data disponível no calendário para continuar',
    form: {
      name: 'Seu nome',
      email: 'Seu e-mail',
      phone: 'Seu telefone',
      event_name: 'Nome do evento',
      event_date: 'Data do evento',
      start_time: 'Horário de início',
      end_time: 'Horário de término',
      location: 'Local do evento',
      notes: 'Observações (opcional)',
      submit: 'Solicitar Agendamento',
      submitting: 'Enviando...',
    },
    success: 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
    conflict: 'Esta data e horário já estão reservados. Por favor, escolha outro.',
    unavailable_dates: 'Selecione uma data disponível',
  },

  // Página Contato
  contact: {
    title: 'Contato',
    subtitle: 'Envie uma mensagem',
    form: {
      name: 'Seu nome',
      email: 'Seu e-mail',
      phone: 'Seu telefone (opcional)',
      subject: 'Assunto',
      message: 'Mensagem',
      submit: 'Enviar Mensagem',
      submitting: 'Enviando...',
    },
    success: 'Mensagem enviada com sucesso! Retornaremos em breve.',
    rate_limit: 'Muitas mensagens enviadas. Tente novamente em 1 hora.',
    error: 'Erro ao enviar mensagem. Tente novamente.',
  },

  // Página Política de Privacidade
  privacy_policy: {
    title: 'Política de Privacidade',
    subtitle: 'Última atualização: 17 de agosto de 2026',
    sub_one: {
      title: '"1. Compromisso com a sua privacidade"',
      paragraph_one: 'A privacidade dos visitantes deste site é importante para nós. Esta Política de Privacidade explica de forma transparente quais informações podem ser coletadas por meio do site de portfólio da Isa Tavares, como essas informações são utilizadas e quais são os direitos dos usuários.',
      paragraph_two: 'Ao utilizar os recursos disponibilizados neste site, o usuário declara estar ciente das práticas descritas nesta política.',
    },
    sub_two: {
      title: '"2. Informações coletadas"',
      paragraph_one: 'Quando você utiliza o formulário de contato disponível no site, podemos receber as seguintes informações fornecidas diretamente por você: ',
      paragraph_one_form: {
        name: 'Nome;',
        email: 'Endereço de e-mail;',
        phone: 'Número de telefone, quando informado;',
        subject: 'Assunto da mensagem;',
        message: 'Conteúdo da mensagem enviada.',
      },
      paragraph_two: 'O fornecimento dessas informações ocorre de forma voluntária e é necessário para que possamos responder adequadamente às mensagens enviadas pelo formulário.',
    },
    sub_three: {
      title: '"3. Como utilizamos suas informações"',
      paragraph_one: 'As informações fornecidas por meio do formulário de contato podem ser utilizadas para: ',
      paragraph_one_form: {
        form_one: 'Responder às mensagens enviadas pelo usuário;',
        form_two: 'Entrar em contato a respeito de apresentações, shows ou eventos;',
        form_three: 'Esclarecer dúvidas e fornecer informações solicitadas;',
        form_four: 'Manter o funcionamento e a segurança dos recursos do site.',
      },
      paragraph_two: 'Os dados não serão utilizados para finalidades incompatíveis com aquelas informadas nesta política.',
    },
    sub_four: {
      title: '"4. Compartilhamento de informações"',
      paragraph_one: 'As informações enviadas pelo usuário são tratadas para possibilitar o atendimento da solicitação realizada por meio do site.',
      paragraph_two: 'Não comercializamos ou vendemos os dados pessoais fornecidos pelos usuários.',
      paragraph_three: 'Quando necessário para o funcionamento técnico do serviço, determinados dados poderão ser processados por fornecedores de infraestrutura ou serviços utilizados pelo site, sempre de acordo com suas respectivas finalidades e políticas aplicáveis.',
    },
    sub_five: {
      title: '"5. Armazenamento e segurança"',
      paragraph_one: 'Adotamos medidas técnicas e organizacionais razoáveis para proteger as informações recebidas por meio do site contra acesso não autorizado, alteração, divulgação ou destruição indevida.',
      paragraph_two: 'Apesar dos esforços empregados, nenhum sistema eletrônico pode ser considerado completamente imune a riscos de segurança.',
    },
    sub_six: {
      title: '"6. Retenção dos dados"',
      paragraph_one: 'As informações poderão ser mantidas pelo período necessário para atender à finalidade para a qual foram fornecidas, cumprir obrigações legais ou preservar registros necessários à segurança e ao funcionamento do serviço.',
    },
    sub_seven: {
      title: '"7. Direitos do usuário"',
      paragraph_one: 'O usuário pode solicitar informações sobre o tratamento de seus dados pessoais e, quando aplicável, solicitar correção, atualização ou exclusão de informações pessoais.',
      paragraph_two: 'Para realizar uma solicitação relacionada à privacidade, entre em contato utilizando os canais disponibilizados neste site.',
    },
    sub_eight: {
      title: '"8. Links externos"',
      paragraph_one: 'Este site pode disponibilizar links para serviços e plataformas externas, como redes sociais e serviços de comunicação.',
      paragraph_two: 'Ao acessar esses serviços, o usuário estará sujeito às políticas de privacidade e aos termos de uso das respectivas plataformas.',
    },
    sub_nine: {
      title: '"9. Alterações nesta política"',
      paragraph_one: 'Esta Política de Privacidade poderá ser atualizada periodicamente para refletir alterações no funcionamento do site, nos serviços utilizados ou nas exigências legais aplicáveis.',
      paragraph_two: 'A versão mais recente estará sempre disponível nesta página.',
    },
    sub_ten: {
      title: '"10. Contato"',
      paragraph_one: 'Caso tenha dúvidas sobre esta Política de Privacidade ou sobre o tratamento de informações pessoais realizado por meio deste site, utilize a página de contato para enviar sua solicitação.',
    },
  },

  // Página Termos de Uso
  terms_of_use: {
    title: 'Termos de Uso',
    subtitle: 'Última atualização: 17 de agosto de 2026',
    sub_one: {
      title: '"1. Aceitação dos termos"',
      paragraph_one: 'Ao acessar e utilizar este site, você concorda com estes Termos de Uso e se compromete a utilizá-lo de acordo com as condições aqui estabelecidas.',
      paragraph_two: 'Caso não concorde com algum dos termos apresentados, recomendamos que não utilize os recursos disponibilizados pelo site.',
    },
    sub_two: {
      title: '"2. Sobre o site"',
      paragraph_one: 'Este site tem como finalidade apresentar o trabalho artístico de Isa Tavares, incluindo informações sobre sua carreira, repertório, vídeos, apresentações, agenda e formas de contato.',
      paragraph_two: 'As informações disponibilizadas podem ser atualizadas ou modificadas sem aviso prévio para manter o conteúdo do site atualizado.',
    },
    sub_three: {
      title: '"3. Uso adequado"',
      paragraph_one: 'O usuário concorda em utilizar o site de maneira legal, responsável e compatível com sua finalidade.',
      paragraph_two: 'Não é permitido utilizar o site para:',
      paragraph_two_form: {
        form_one: 'Praticar atividades que violem leis ou regulamentos aplicáveis;',
        form_two: 'Tentar obter acesso não autorizado a sistemas ou informações;',
        form_three: 'Interferir no funcionamento normal do site;',
        form_four: 'Utilizar o conteúdo do site para finalidades ilícitas;',
        form_five: 'Reproduzir ou distribuir conteúdo protegido sem autorização.',
      },
    },
    sub_four: {
      title: '"4. Propriedade intelectual"',
      paragraph_one: 'Os textos, imagens, vídeos, elementos visuais, identidade gráfica, logotipo e demais conteúdos disponibilizados neste site podem estar protegidos pela legislação aplicável de propriedade intelectual.',
      paragraph_two: 'A utilização de qualquer conteúdo além do permitido pela legislação aplicável depende de autorização do respectivo titular dos direitos.',
    },
    sub_five: {
      title: '"5. Links e serviços externos"',
      paragraph_one: 'O site pode apresentar links para plataformas externas, incluindo redes sociais, serviços de vídeo e aplicativos de comunicação.',
      paragraph_two: 'Esses serviços são operados por terceiros e possuem seus próprios termos de uso e políticas de privacidade.',
      paragraph_three: 'O acesso e a utilização dessas plataformas estão sujeitos às regras estabelecidas por seus respectivos operadores.',
    },
    sub_six: {
      title: '"6. Disponibilidade do site"',
      paragraph_one: 'Embora sejam adotados esforços para manter o site disponível e funcionando corretamente, não é possível garantir que o serviço estará permanentemente livre de interrupções, falhas técnicas ou indisponibilidades.',
      paragraph_two: 'Recursos, páginas e funcionalidades podem ser modificados, suspensos ou removidos quando necessário.',
    },
    sub_seven: {
      title: '"7. Informações de apresentações e eventos"',
      paragraph_one: 'Informações relacionadas a shows, apresentações, disponibilidade, valores, datas e condições de contratação podem estar sujeitas a alterações e confirmação prévia.',
      paragraph_two: 'O envio de uma mensagem ou solicitação pelo site não representa, por si só, a confirmação de uma contratação ou reserva de data.',
    },
    sub_eight: {
      title: '"8. Limitação de responsabilidade"',
      paragraph_one: 'O conteúdo do site é disponibilizado com o objetivo de apresentar informações sobre o trabalho artístico e facilitar o contato com Isa Tavares.',
      paragraph_two: 'Não nos responsabilizamos por indisponibilidades, alterações ou informações apresentadas em plataformas externas vinculadas ao site.',
    },
    sub_nine: {
      title: '"9. Alterações dos termos"',
      paragraph_one: 'Estes Termos de Uso poderão ser atualizados sempre que necessário para refletir mudanças no site, nos serviços disponibilizados ou nas obrigações legais aplicáveis.',
      paragraph_two: 'A versão atualizada estará disponível nesta página.',
    },
    sub_ten: {
      title: '"10. Contato"',
      paragraph_one: 'Caso tenha dúvidas sobre estes Termos de Uso, você pode entrar em contato utilizando o formulário disponível na página de contato.',
    },
  },

  // Painel Admin
  admin: {
    login: {
      title: 'Acesso Administrativo',
      username: 'Usuário',
      password: 'Senha',
      submit: 'Entrar',
      error: 'Credenciais inválidas.',
    },
    dashboard: {
      title: 'Painel Admin',
      view_portfolio: 'Ver portfólio',
      songs: 'Músicas',
      videos: 'Vídeos',
      bookings: 'Agendamentos',
      messages: 'Mensagens',
      return_portfolio: 'Voltar ao portfólio',
      logout: 'Sair',
    },
    actions: {
      add: 'Adicionar',
      edit: 'Editar',
      delete: 'Excluir',
      save: 'Salvar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      confirm_delete: 'Tem certeza que deseja excluir?',
    },
    booking_status: {
      PENDING: 'Pendente',
      CONFIRMED: 'Confirmado',
      CANCELLED: 'Cancelado',
    },
    add: {
      title: 'Título *',
      artist: 'Artista *',
      genre: 'Gênero *',
      lyrics: 'Letra da música',
      mark: 'Marcar como mais pedida',
      mark_featured: 'Marcar como destaque',
      url: 'URL do YouTube *',
      url_cloudinary: 'URL do Áudio (Cloudinary)',
      description: 'Descrição (opcional)',
    },
  },

  placeholders: {
    name: 'Digite seu nome (mín. 2 caracteres)',
    full_name: 'Digite seu nome completo (mín. 2 caracteres)',
    email: 'Digite seu melhor e-mail',
    email_reply: 'Digite seu melhor e-mail para resposta',
    phone: 'Digite seu telefone com DDD: (11) 99999-9999',
    phone_opt: 'Ex: (11) 99999-9999',
    event_name: 'Digite o nome do evento — ex: Festa de 15 anos, etc.',
    location: 'Nome e cidade do local — ex: Salão Festivo, Brasília',
    notes: 'Informações adicionais — tema, convidados, necessidades especiais...',
    subject: 'Assunto da mensagem (mín. 3 caracteres)',
    message: 'Digite sua mensagem (mín. 10 e máx. 2000 caracteres)...',
    song_title: 'Digite o título da música',
    song_artist: 'Nome do artista original',
    song_genre: 'Ex: MPB, Sertanejo, etc.',
    song_lyrics: 'Digite a letra da música...',
    song_cloudinary: 'Cole aqui o link do Áudio',
    youtube_url: 'Cole aqui o link do YouTube — ex: https://youtube.com/watch?v=...',
    video_title: 'Digite o título do vídeo',
    video_desc: 'Descrição do vídeo — local, data, evento...',
    username: 'Digite seu usuário',
    password: 'Digite sua senha',
  },

  // Estados comuns
  common: {
    loading: 'Carregando...',
    error: 'Ocorreu um erro. Tente novamente.',
    not_found: 'Não encontrado.',
    back: 'Voltar',
    close: 'Fechar',
    see_more: 'Ver mais',
    required_field: 'Campo obrigatório',
    clear_button: 'Limpar',
    lyrics_button: 'Ver letra',
    hear_button: 'Ouvir música',
    most_requested: 'Mais pedidas',
    video_tip: 'Pressione ESC ou clique fora para fechar',
    audio_tip: 'ESPAÇO para pausar • ESC para fechar',
    singer: 'Isa Tavares Cantora',
    previous_button: 'Anterior',
    next_button: 'Próxima',
    emphasis: 'Destaque',
  },
}

export default ptBR