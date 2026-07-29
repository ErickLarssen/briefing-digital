export const socialMediaGroups = [
  [
    { id: 'redes_prioritarias', type: 'text', label: 'Quais redes sociais são prioridade?' },
    {
      id: 'frequencia_postagens',
      type: 'select',
      label: 'Qual a frequência de postagens desejada?',
      options: [
        { value: 'diaria', label: 'Diária' },
        { value: '3x_semana', label: '3 vezes por semana' },
        { value: 'semanal', label: 'Semanal' },
        { value: 'quinzenal', label: 'Quinzenal' },
      ],
    },
  ],
  [
    {
      id: 'identidade_definida',
      type: 'select',
      label: 'Já tem identidade visual definida?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
    { id: 'tipo_conteudo', type: 'text', label: 'Que tipo de conteúdo? (educativo, institucional, vendas...)' },
  ],
];
