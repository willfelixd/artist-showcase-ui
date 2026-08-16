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
      mark: 'Marcar como mais pedida',
      mark_featured: 'Marcar como destaque',
      url: 'URL do YouTube *',
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
  },
}

export default ptBR