export const identidadeVisualGroups = [
  [
    { id: 'valores_marca', type: 'textarea', label: 'Quais valores sua marca representa?' },
    { id: 'publico_alvo', type: 'textarea', label: 'Quem é o público-alvo da marca?' },
  ],
  [
    { id: 'adjetivos_marca', type: 'text', label: 'Três adjetivos que descrevem sua marca' },
    { id: 'cores_evitar', type: 'text', label: 'Alguma cor que não deseja usar?', required: false },
    {
      id: 'naming_definido',
      type: 'select',
      label: 'Já tem o nome (naming) definido?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
  ],
];
