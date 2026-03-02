# Fluxo

## 1. Login

Promotor realiza autenticação com credenciais.

---

## 2. Tela Inicial

Tela fullscreen com botão "Toque para iniciar".

---

## 3. Pré-Captura

Visualização da câmera com proporção 9:16.

---

## 4. Contagem Regressiva

Contagem de 3 segundos antes da captura.

---

## 5. Captura

Frame da câmera é capturado sem redimensionamento.

---

## 6. Upload

Imagem enviada para backend.

---

## 7. Processamento

Backend:
- Recebe imagem
- Aplica moldura PNG transparente
- Salva imagem final

---

## 8. Revisão

Usuário pode:
- Refazer
- Aprovar

---

## 9. QR Code

QR aponta para:

/download/{photoId}

---

## 10. Download

Usuário escaneia QR:
- Download automático
ou
- Página com botão de download

---

## 11. Reset

Sistema retorna automaticamente à tela inicial.