# Decisões 

## 1. Backend dentro do Next.js

### Alternativa
API separada (Express)

### Escolha
Route Handlers do Next.js

### Motivo
Menor complexidade, deploy único e suficiente para o escopo.

---

## 2. SQLite

### Alternativa
PostgreSQL

### Escolha
SQLite

### Motivo
Projeto é single-instance e controlado.
Reduz setup e facilita avaliação local.

---

## 3. Processamento de imagem no backend

### Alternativa
Aplicar moldura no Canvas do cliente

### Escolha
Sharp no servidor

### Motivo
Maior controle, evita manipulação maliciosa e garante integridade do residual.

---

## 4. Não redimensionar imagem

### Motivo
Requisito do desafio: manter imagem original dentro da moldura.
Overlay aplicado sem resize.

---

## 5. JWT Stateless

### Motivo
Simplicidade.
Não exige sessão persistida em banco.