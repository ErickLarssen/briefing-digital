export const aplicativoGroups = [
  [
    {
      id: 'plataformas',
      type: 'select',
      label: 'Em quais plataformas o app deve rodar?',
      options: [
        { value: 'ios', label: 'iOS' },
        { value: 'android', label: 'Android' },
        { value: 'ambos', label: 'Ambos' },
      ],
    },
    { id: 'funcionalidades_essenciais', type: 'textarea', label: 'Quais funcionalidades são essenciais no lançamento?' },
  ],
  [
    {
      id: 'precisa_backend',
      type: 'select',
      label: 'Vai precisar de um backend próprio?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
        { value: 'nao_sei', label: 'Não sei' },
      ],
    },
    { id: 'apps_referencia', type: 'text', label: 'Cite apps que você admira como referência', required: false },
  ],
];
