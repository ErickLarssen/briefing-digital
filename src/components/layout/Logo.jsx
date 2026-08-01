import { forwardRef } from 'react';
import logoWebp from '@/assets/logo.webp';
import logoPng from '@/assets/logo.png';

// WebP primeiro (~37% mais leve que o PNG original), com fallback automático
// para PNG em navegadores que não suportam WebP — o <picture> escolhe sozinho.
const Logo = forwardRef(function Logo({ className }, ref) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img ref={ref} src={logoPng} alt="Erick Silva" className={className} />
    </picture>
  );
});

export default Logo;
