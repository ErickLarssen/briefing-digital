export const sistemaWebGroups = [
  [
    { id: 'funcionalidades_principais', type: 'textarea', label: 'Quais são as funcionalidades principais do sistema?' },
    { id: 'perfis_usuario', type: 'text', label: 'Quais perfis de usuário existem? (ex: admin, cliente)' },
  ],
  [
    { id: 'integracoes_externas', type: 'text', label: 'Precisa integrar com algum sistema externo?', required: false },
    {
      id: 'sistema_legado',
      type: 'select',
      label: 'Já existe um sistema legado que será substituído?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
  ],
];
