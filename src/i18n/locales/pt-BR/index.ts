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
      mostRequested: 'Mais Pedidas',
      featured_videos: 'Vídeos em Destaque',
    },
  },

  // Página Repertório
  repertoire: {
    title: 'Repertório',
    search_placeholder: 'Buscar música...',
    filter_genre: 'Filtrar por gênero',
    all_genres: 'Todos os gêneros',
    most_requested: 'Mais Pedidas',
    full_repertoire: 'Repertório Completo',
    no_results: 'Nenhuma música encontrada.',
    load_more: 'Carregar mais',
  },

  // Página Vídeos
  videos: {
    title: 'Vídeos',
    featured: 'Em Destaque',
    all_videos: 'Todos os Vídeos',
    no_videos: 'Nenhum vídeo disponível.',
    load_more: 'Carregar mais',
    watch: 'Assistir',
  },

  // Página Agenda
  schedule: {
    title: 'Agenda',
    subtitle: 'Solicite um show',
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
    unavailable_dates: 'Datas indisponíveis',
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
      songs: 'Músicas',
      videos: 'Vídeos',
      bookings: 'Agendamentos',
      messages: 'Mensagens',
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
  },
}

export default ptBR