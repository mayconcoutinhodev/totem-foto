import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
  permissions: ['camera'],
});

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },   // iPhone SE (Tela pequena)
  { name: 'Tablet', width: 768, height: 1024 },  // iPad
  { name: 'Totem_4K', width: 1080, height: 1920 } // Totem Vertical
];

test.describe('Validação de Layout Responsivo', () => {

  for (const vp of viewports) {
    test(`Fluxo Completo no dispositivo: ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.goto('/login');
      const loginInput = page.locator('input[placeholder="OPERATOR@NEXLAB.COM"]');
      
      await loginInput.scrollIntoViewIfNeeded();
      await loginInput.fill('promotor@local.com');
      await page.fill('input[type="password"]', 'promotor');
      await page.click('button:has-text("Autenticar Sessão")');

      await page.click('a:has-text("Iniciar Totem")');
      await expect(page).toHaveURL(/.*home/);


      const startBtn = page.getByRole('button', { name: /iniciar/i });
      await startBtn.scrollIntoViewIfNeeded();
      await expect(startBtn).toBeInViewport();
      await startBtn.click();

      await expect(page).toHaveURL(/.*capture/);
      const captureBtn = page.getByRole('button').first();
      
      await expect(page.locator('video')).toBeVisible();
      await captureBtn.scrollIntoViewIfNeeded();
      
      await captureBtn.click({ force: true });

      await expect(page).toHaveURL(/.*review/);
      const avancaBtn = page.getByRole('button', { name: /avançar/i });
      await avancaBtn.scrollIntoViewIfNeeded();
      await expect(avancaBtn).toBeInViewport();
      await avancaBtn.click();

      await expect(page).toHaveURL(/.*download/, { timeout: 15000 });
      const proxPassoBtn = page.getByRole('button', { name: /próximo passo/i });
      
      const qrCode = page.locator('img[alt*="QR"]');
      await expect(qrCode).toBeInViewport();
      
      await proxPassoBtn.click();

      await expect(page).toHaveURL(/.*final/);
      const encerrarBtn = page.getByRole('button', { name: /encerrar agora/i });
      await expect(encerrarBtn).toBeInViewport();
      await encerrarBtn.click();
      
      await expect(page).toHaveURL(/.*home/);
    });
  }
});