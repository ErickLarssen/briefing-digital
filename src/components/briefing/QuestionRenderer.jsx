import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

// Único ponto do sistema que sabe "traduzir" um objeto de pergunta (dado)
// para um componente visual de fato. Adicionar um tipo novo de pergunta no
// futuro (ex: upload) significa mexer só aqui, nunca nos arquivos de dados.
function QuestionRenderer({ question, value, onChange, error }) {
  const commonProps = {
    // Deixa explícito o que pode ser pulado (ex: orçamento) — antes o cliente
    // só descobria tentando avançar.
    label: question.required === false ? `${question.label} (opcional)` : question.label,
    value: value ?? '',
    onChange: (event) => onChange(question.id, event.target.value),
    error,
    helperText: question.helperText,
  };

  if (question.type === 'select') {
    return <Select {...commonProps} options={question.options} placeholder={question.placeholder} />;
  }

  if (question.type === 'textarea') {
    return <Input multiline {...commonProps} placeholder={question.placeholder} />;
  }

  return <Input {...commonProps} placeholder={question.placeholder} />;
}

export default QuestionRenderer;
