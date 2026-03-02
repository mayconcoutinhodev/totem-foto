# Fluxo Admin

## 1. Login

Usuário com role ADMIN realiza autenticação.

---

## 2. Dashboard

Exibe métricas gerais:

- Total de fotos
- Total de fotos no período filtrado

---

## 3. Filtros

Filtros disponíveis:
- Data inicial
- Data final

Filtro é aplicado via query params.

---

## 4. Listagem

Tabela paginada contendo:

- Thumbnail da foto
- Data e hora
- ID
- Promotor responsável

Permite:

- Alterar quantidade por página
- Navegar entre páginas

---

## 5. Modal

Ao clicar em uma foto:

- Abre modal
- Exibe imagem maior
- Exibe QR Code referente ao download da foto

---

## 6. Segurança

Todas as rotas do admin são protegidas por middleware que valida role ADMIN.