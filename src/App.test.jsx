import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renderiza a Home sem quebrar', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // A Home é carregada com React.lazy (+ GSAP). Rodando junto com os outros
    // arquivos de teste, o import pode passar de 1s (timeout padrão) — por isso
    // um limite maior, sem mudar o que está sendo verificado.
    expect(await screen.findByText(/Conte sua/i, {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
