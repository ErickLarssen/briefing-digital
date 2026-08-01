import { describe, it, expect } from 'vitest';
import { formatFileSize } from './formatters';

describe('formatFileSize', () => {
  it('formata bytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('formata kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('formata megabytes', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB');
  });
});
