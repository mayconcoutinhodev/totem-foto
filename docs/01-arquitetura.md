# Arquitetura

## 1. Overview

Aplicação web para ativação interativa em evento.

Fluxo principal:
- Promotor realiza login
- Participante tira foto
- Moldura é aplicada
- QR Code é gerado para download
- Sistema retorna automaticamente ou manual para tela inicial

Perfis:
- PROMOTOR → acesso ao fluxo da ativação
- ADMIN → acesso ao painel administrativo

---

## 2. Stack

- Next.js → frontend + backend unificado
- SQLite → persistência simples para ambiente controlado
- Prisma → ORM tipado
- NextAuth (JWT) → autenticação e RBAC
- Sharp → processamento de imagem no servidor
- QRCode → geração de QR

---

## 3. Arquitetura em Camadas

UI (React Components)
↓
Route Handlers (API)
↓
Services (lógica de negócio)
↓
Prisma
↓
SQLite



---

## 5. Processamento de Imagem

- Captura ocorre no cliente
- Upload enviado ao backend
- Sharp aplica overlay da moldura
- Imagem final salva sem resize ou distorção