export const modelagem3dGroups = [
  [
    {
      id: 'finalidade_3d',
      type: 'select',
      label: 'Qual a finalidade da modelagem?',
      options: [
        { value: 'produto', label: 'Produto' },
        { value: 'arquitetura', label: 'Arquitetura' },
        { value: 'personagem', label: 'Personagem' },
        { value: 'outro', label: 'Outro' },
      ],
    },
    {
      id: 'nivel_realismo',
      type: 'select',
      label: 'Qual nível de realismo você espera?',
      options: [
        { value: 'realista', label: 'Realista' },
        { value: 'estilizado', label: 'Estilizado' },
        { value: 'low_poly', label: 'Low poly' },
      ],
    },
  ],
  [{ id: 'formato_entrega', type: 'text', label: 'Em que formato você precisa receber o arquivo?' }],
];
