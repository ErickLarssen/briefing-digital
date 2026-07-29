import emailjs from '@emailjs/browser';
import { buildReviewSections } from '@/utils/buildReviewSections';
import { formatFileSize } from '@/utils/formatters';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function formatSectionsAsText(sections) {
  return sections
    .map((section) => {
      const lines = section.items.map((item) => `${item.label}: ${item.value}`).join('\n');
      return `${section.title.toUpperCase()}\n${lines}`;
    })
    .join('\n\n');
}

// Plano gratuito do EmailJS não permite anexar os arquivos de verdade —
// por isso listamos nome e tamanho como referência no corpo do e-mail.
// Se um dia o plano virar pago, é aqui que entraria o Variable Attachment.
function formatFilesAsText(files) {
  if (files.length === 0) return 'Nenhum arquivo anexado.';
  return files.map(({ file }) => `- ${file.name} (${formatFileSize(file.size)})`).join('\n');
}

export async function sendBriefingEmail({ nicheSlug, answers, files }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS não configurado. Verifique as variáveis de ambiente (.env).');
  }

  const sections = buildReviewSections(nicheSlug, answers);

  const templateParams = {
    client_name: answers.nome_completo || 'Não informado',
    client_company: answers.nome_empresa || 'Não informado',
    client_email: answers.email || 'Não informado',
    client_phone: answers.telefone || 'Não informado',
    project_type: sections[1].title,
    submitted_at: new Date().toLocaleString('pt-BR'),
    briefing_details: formatSectionsAsText(sections),
    attached_files: formatFilesAsText(files),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
}
