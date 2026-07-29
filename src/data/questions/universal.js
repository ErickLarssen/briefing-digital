// Perguntas que aparecem para todo cliente, independente do nicho.
// Divididas em "intro" (antes das perguntas do nicho) e "outro" (depois) —
// é assim que aplicamos a decisão da Etapa 1 de deixar o orçamento por último.

export const universalIntroGroups = [
  [
    { id: 'nome_completo', type: 'text', label: 'Nome completo' },
    { id: 'nome_empresa', type: 'text', label: 'Nome da empresa ou marca' },
  ],
  [
    { id: 'email', type: 'text', label: 'E-mail' },
    { id: 'telefone', type: 'text', label: 'Telefone ou WhatsApp' },
  ],
  [
    {
      id: 'como_conheceu',
      type: 'select',
      label: 'Como você conheceu nosso trabalho?',
      options: [
        { value: 'indicacao', label: 'Indicação' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'google', label: 'Google' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'outro', label: 'Outro' },
      ],
    },
    {
      id: 'prazo_desejado',
      type: 'select',
      label: 'Qual o prazo desejado para o projeto?',
      options: [
        { value: 'menos_1_mes', label: 'Menos de 1 mês' },
        { value: '1_3_meses', label: '1 a 3 meses' },
        { value: '3_6_meses', label: '3 a 6 meses' },
        { value: 'mais_6_meses', label: 'Mais de 6 meses' },
        { value: 'nao_sei', label: 'Ainda não sei' },
      ],
    },
  ],
  [
    {
      id: 'projeto_anterior',
      type: 'select',
      label: 'Você já teve identidade visual ou site antes?',
      options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' },
      ],
    },
  ],
];

export const universalOutroGroups = [
  [
    {
      id: 'orcamento_estimado',
      type: 'select',
      label: 'Qual sua faixa de orçamento estimada?',
      required: false,
      helperText: 'Ajuda a alinhar expectativas — pode pular se preferir',
      options: [
        { value: 'ate_5k', label: 'Até R$ 5 mil' },
        { value: '5k_15k', label: 'R$ 5 mil a R$ 15 mil' },
        { value: '15k_30k', label: 'R$ 15 mil a R$ 30 mil' },
        { value: 'acima_30k', label: 'Acima de R$ 30 mil' },
        { value: 'prefiro_nao_informar', label: 'Prefiro não informar' },
      ],
    },
  ],
];
