import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    args: [
      '--use-fake-ui-for-media-stream', 
      '--use-fake-device-for-media-stream'
    ],
  },
  permissions: ['camera'],
});

test.describe('Fluxo Completo do Totem Nex.Lab', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'promotor@local.com');
    await page.fill('input[type="password"]', 'promotor');
    await page.click('button:has-text("Autenticar Sessão")');
    await expect(page).not.toHaveURL(/.*login/);
  });

  test('Deve completar o ciclo: Welcome -> Home -> Capture -> Review -> Download -> Final', async ({ page }) => {
    await page.getByRole('link', { name: /iniciar totem/i }).click();
    await page.getByRole('button', { name: /iniciar/i }).click();

    await expect(page.locator('video')).toBeVisible();
    await page.getByRole('button').first().click();

    await expect(page).toHaveURL(/.*review/);
    await page.getByRole('button', { name: /avançar/i }).click();

    await expect(page).toHaveURL(/.*download/, { timeout: 15000 });
    await page.getByRole('button', { name: /próximo passo/i }).click();

    await expect(page).toHaveURL(/.*final/);
    
    const finalQrCode = page.locator('img[alt="QR Code"]');
    await expect(finalQrCode).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: /encerrar agora/i }).click();
    await expect(page).toHaveURL(/.*home/);
  });

  test('Deve redirecionar para home automaticamente após o timer na tela final', async ({ page }) => {

    await page.goto('/final');
    
    await expect(page).toHaveURL(/.*home/, { timeout: 15000 });
  });

  test('Deve exibir o QR Code ou o estado de sincronização na tela final', async ({ page }) => {
    await page.goto('/final');
    const syncing = page.locator('text=Syncing...');
    const qrCode = page.locator('img[alt="QR Code"]');
    await expect(syncing.or(qrCode)).toBeVisible();
  });

});