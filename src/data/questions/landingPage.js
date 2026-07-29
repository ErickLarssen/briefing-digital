export const landingPageGroups = [
  [
    {
      id: 'objetivo_conversao',
      type: 'select',
      label: 'Qual o objetivo principal da página?',
      options: [
        { value: 'venda_direta', label: 'Venda direta' },
        { value: 'captura_lead', label: 'Captura de lead' },
        { value: 'inscricao', label: 'Inscrição ou cadastro' },
        { value: 'outro', label: 'Outro' },
      ],
    },
    { id: 'produto_oferta', type: 'textarea', label: 'Qual é o produto ou oferta principal?' },
  ],
  [
    {
      id: 'copy_pronta',
      type: 'select',
      label: 'Você já tem o texto (copy) pronto?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
    {
      id: 'integracoes_necessarias',
      type: 'text',
      label: 'Precisa de alguma integração? (checkout, CRM, etc.)',
      required: false,
    },
  ],
];
