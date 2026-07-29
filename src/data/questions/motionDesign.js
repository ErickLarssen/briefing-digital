export const motionDesignGroups = [
  [
    {
      id: 'duracao_estimada',
      type: 'select',
      label: 'Qual a duração estimada da peça?',
      options: [
        { value: 'ate_15s', label: 'Até 15 segundos' },
        { value: '15_30s', label: '15 a 30 segundos' },
        { value: '30_60s', label: '30 a 60 segundos' },
        { value: 'mais_1min', label: 'Mais de 1 minuto' },
      ],
    },
    {
      id: 'finalidade',
      type: 'select',
      label: 'Qual a finalidade da animação?',
      options: [
        { value: 'institucional', label: 'Institucional' },
        { value: 'produto', label: 'Produto' },
        { value: 'rede_social', label: 'Rede social' },
        { value: 'evento', label: 'Evento' },
      ],
    },
  ],
  [
    { id: 'estilo_animacao', type: 'text', label: 'Que estilo de animação você imagina?' },
    {
      id: 'roteiro_pronto',
      type: 'select',
      label: 'Já tem roteiro ou storyboard pronto?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
  ],
];
