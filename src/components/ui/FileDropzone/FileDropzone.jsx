import { useRef, useState } from 'react';
import styles from './FileDropzone.module.css';

function FileDropzone({ onFilesSelected, multiple = true, accept }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList) {
    const files = Array.from(fileList);
    if (files.length > 0) onFilesSelected(files);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleInputChange(event) {
    handleFiles(event.target.files);
    // limpa o input para permitir selecionar o mesmo arquivo de novo, se removido antes
    event.target.value = '';
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputRef.current.click();
    }
  }

  return (
    <div
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current.click()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Enviar arquivos de referência"
    >
      <p className={styles.text}>Arraste arquivos aqui ou clique para selecionar</p>
      <p className={styles.hint}>Imagens, PDFs ou documentos de referência</p>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        className={styles.hiddenInput}
        tabIndex={-1}
      />
    </div>
  );
}

export default FileDropzone;
