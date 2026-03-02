# API

## Auth

POST /api/auth/login
- Body: email, password
- Retorno: JWT

Proteção baseada em role via middleware.

---

## Photo

POST /api/photo
Role: PROMOTOR
Body: imagem (multipart)
Função:
- Processa imagem
- Aplica moldura
- Salva no servidor
- Registra no banco

---

GET /api/photo/:id
Role: ADMIN
Retorna dados da foto

---

GET /api/admin/photos
Role: ADMIN
Query params:
- page
- perPage
- startDate
- endDate

Retorno:
- Lista paginada
- Total geral
- Total filtrado

---

GET /download/:id
Público
Retorna imagem com header:
Content-Disposition: attachment