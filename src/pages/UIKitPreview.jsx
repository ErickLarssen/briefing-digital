import { useState } from 'react';
import { Button, Input, Card, Badge, ProgressBar, Stepper, Modal, Toast } from '@/components/ui';

// Página temporária, só para conferência visual do UI Kit.
// Remova a rota /ui-kit em AppRoutes.jsx quando não precisar mais dela.
function UIKitPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button variant="primary">Começar</Button>
        <Button variant="secondary">Voltar</Button>
        <Button variant="ghost">Pular</Button>
        <Button variant="primary" disabled>
          Desabilitado
        </Button>
      </section>

      <section style={{ maxWidth: 320 }}>
        <Input label="Nome da empresa" placeholder="Digite aqui" />
      </section>
      <section style={{ maxWidth: 320 }}>
        <Input label="E-mail" error="Formato de e-mail inválido" defaultValue="teste@" />
      </section>

      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Card style={{ width: 220 }}>Card padrão</Card>
        <Card hoverable style={{ width: 220 }}>
          Card com hover (passe o mouse)
        </Card>
      </section>

      <section style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <Badge variant="neutral">Neutro</Badge>
        <Badge variant="gold">Dourado</Badge>
        <Badge variant="success">Sucesso</Badge>
        <Badge variant="danger">Erro</Badge>
        <Badge variant="warning">Aviso</Badge>
        <Badge variant="info">Info</Badge>
      </section>

      <section style={{ maxWidth: 400 }}>
        <ProgressBar value={60} max={100} />
      </section>

      <section style={{ maxWidth: 400 }}>
        <Stepper totalSteps={5} currentStep={3} />
      </section>

      <section>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Abrir modal
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Exemplo de modal">
          Este é o conteúdo do modal. Clique fora, aperte Esc ou use o X para fechar.
        </Modal>
      </section>

      <section>
        {showToast && (
          <Toast
            message="Briefing salvo automaticamente."
            variant="success"
            onDismiss={() => setShowToast(false)}
          />
        )}
      </section>
    </div>
  );
}

export default UIKitPreview;
