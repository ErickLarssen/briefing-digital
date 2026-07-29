# Plataforma de Briefing

Projeto React + Vite para coleta de briefing premium de clientes.

## Como rodar localmente

Este projeto foi montado sem acesso à internet no ambiente de geração, então as
dependências ainda não estão instaladas. Na sua máquina:

```bash
npm install
npm run dev
```

O Vite vai abrir em `http://localhost:5173`.

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção em `dist/`
- `npm run preview` — serve a build de produção localmente
- `npm run lint` — roda o ESLint

## Estrutura de pastas

Veja a Etapa 3 (Arquitetura de Software) do nosso plano para a explicação de cada pasta.

## Configurando o envio de e-mail (EmailJS)

O envio do briefing usa o [EmailJS](https://www.emailjs.com/), que dispensa um servidor próprio.

1. Crie uma conta gratuita em emailjs.com e conecte um serviço de e-mail (Gmail, Outlook, etc.) — isso gera um **Service ID**.
2. Crie um template de e-mail. Nele, use estas variáveis (exatamente com estes nomes) onde quiser que apareçam no corpo do e-mail:
   - `{{client_name}}`, `{{client_company}}`, `{{client_email}}`, `{{client_phone}}`
   - `{{project_type}}`, `{{submitted_at}}`
   - `{{briefing_details}}` — bloco de texto com todas as respostas organizadas por seção
   - `{{attached_files}}` — lista de nomes/tamanhos dos arquivos anexados pelo cliente (o plano gratuito do EmailJS não permite anexar os arquivos de verdade — veja `src/services/emailService.js` para o motivo)
3. Copie o **Template ID** gerado.
4. Vá em Account > General e copie sua **Public Key**.
5. Copie `.env.example` para um arquivo `.env` na raiz do projeto e preencha:
   ```
   VITE_EMAILJS_SERVICE_ID=seu_service_id
   VITE_EMAILJS_TEMPLATE_ID=seu_template_id
   VITE_EMAILJS_PUBLIC_KEY=sua_public_key
   ```
6. Reinicie `npm run dev` (variáveis de ambiente só são lidas na inicialização).

O `.env` nunca é commitado (já está no `.gitignore`).
