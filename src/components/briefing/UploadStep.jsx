import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import FileDropzone from '@/components/ui/FileDropzone';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatFileSize } from '@/utils/formatters';
import { EASE, DURATION } from '@/utils/motion';
import styles from './UploadStep.module.css';

function UploadStep({ files, onAddFiles, onRemoveFile, onNext, onBack }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, { opacity: 0, y: 12, duration: DURATION, ease: EASE });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  function handleFilesSelected(selectedFiles) {
    const withIds = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));
    onAddFiles(withIds);
  }

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div>
        <h2 style={{ marginBottom: 'var(--space-2)' }}>Tem alguma referência visual?</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Opcional — envie imagens, PDFs ou materiais que ajudem a entender sua ideia.
        </p>
      </div>

      <FileDropzone onFilesSelected={handleFilesSelected} />

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map(({ id, file }) => (
            <li key={id} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <div className={styles.fileMeta}>
                <Badge variant="neutral">{formatFileSize(file.size)}</Badge>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => onRemoveFile(id)}
                  aria-label={`Remover ${file.name}`}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button variant="primary" onClick={onNext}>
          {files.length > 0 ? 'Próximo' : 'Pular esta etapa'}
        </Button>
      </div>
    </div>
  );
}

export default UploadStep;
