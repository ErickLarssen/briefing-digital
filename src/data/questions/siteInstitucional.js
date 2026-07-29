export const siteInstitucionalGroups = [
  [
    {
      id: 'numero_paginas',
      type: 'select',
      label: 'Quantas páginas você estima que o site vai ter?',
      options: [
        { value: '1_3', label: '1 a 3' },
        { value: '4_6', label: '4 a 6' },
        { value: '7_10', label: '7 a 10' },
        { value: 'mais_10', label: 'Mais de 10' },
      ],
    },
    { id: 'secoes_desejadas', type: 'textarea', label: 'Quais seções você imagina? (ex: sobre, serviços, blog)' },
  ],
  [
    {
      id: 'conteudo_pronto',
      type: 'select',
      label: 'Já tem os textos e conteúdo prontos?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
    {
      id: 'painel_administrativo',
      type: 'select',
      label: 'Precisa editar o conteúdo você mesmo depois (painel administrativo)?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
  ],
];
