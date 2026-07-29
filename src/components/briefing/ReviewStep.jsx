import { useState } from 'react';
import { buildReviewSections } from '@/utils/buildReviewSections';
import { formatFileSize } from '@/utils/formatters';
import { sendBriefingEmail } from '@/services/emailService';
import { useToast } from '@/context/ToastContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import styles from './ReviewStep.module.css';

function ReviewStep({ nicheSlug, answers, files, onBack, onSubmitted }) {
  const [isSending, setIsSending] = useState(false);
  const { showToast } = useToast();
  const sections = buildReviewSections(nicheSlug, answers);

  async function handleConfirm() {
    setIsSending(true);
    try {
      await sendBriefingEmail({ nicheSlug, answers, files });
      showToast('Briefing enviado com sucesso!', 'success');
      onSubmitted();
    } catch (error) {
      console.error('Falha ao enviar briefing:', error);
      showToast('Não foi possível enviar. Tente novamente em instantes.', 'danger');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div>
        <h2 style={{ marginBottom: 'var(--space-2)' }}>Revise antes de enviar</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Confira suas respostas. Se algo estiver errado, volte e ajuste antes de confirmar.
        </p>
      </div>

      {sections.map((section) => (
        <Card key={section.title}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <dl className={styles.list}>
            {section.items.map((item) => (
              <div key={item.id} className={styles.row}>
                <dt className={styles.term}>{item.label}</dt>
                <dd className={styles.value}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ))}

      <Card>
        <h3 className={styles.sectionTitle}>Arquivos anexados</h3>
        {files.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>Nenhum arquivo anexado.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {files.map(({ id, file }) => (
              <Badge key={id} variant="neutral">
                {file.name} · {formatFileSize(file.size)}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="ghost" onClick={onBack} disabled={isSending}>
          Voltar
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={isSending}>
          {isSending ? 'Enviando...' : 'Confirmar e enviar'}
        </Button>
      </div>
    </div>
  );
}

export default ReviewStep;
