import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
  permissions: ['camera', 'clipboard-read', 'clipboard-write'],
});

test.describe('Sistema Nex.Lab - Ponta a Ponta', () => {

  test.describe('Fluxo Operacional do Totem', () => {
    
    test.beforeEach(async ({ page }) => {
        
      await page.goto('/login');
      await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'promotor@local.com');
      await page.fill('input[type="password"]', 'promotor');
      await page.click('button:has-text("Autenticar Sessão")');
      await expect(page).toHaveURL('http://127.0.0.1:3000/');
    });

    test('Deve realizar o ciclo completo da foto até a tela final', async ({ page }) => {

      await page.getByRole('link', { name: /iniciar totem/i }).click();
      await page.getByRole('button', { name: /iniciar/i }).click();

      await expect(page.locator('video')).toBeVisible();
      await page.getByRole('button').first().click();

      await expect(page).toHaveURL(/.*review/);
      await page.getByRole('button', { name: /avançar/i }).click();

      await expect(page).toHaveURL(/.*download/, { timeout: 15000 });
      await page.getByRole('button', { name: /próximo passo/i }).click();

      await expect(page).toHaveURL(/.*final/);
      await expect(page.locator('h2')).toContainText('Obrigado!');
      
      await page.getByRole('button', { name: /encerrar agora/i }).click();
      await expect(page).toHaveURL(/.*home/);
    });
  });

  test.describe('Painel Administrativo', () => {
    
    test.beforeEach(async ({ page }) => {

      await page.goto('/login');
      await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'admin@local.com');
      await page.fill('input[type="password"]', 'admin');
      await page.click('button:has-text("Autenticar Sessão")');
      await expect(page).toHaveURL('http://127.0.0.1:3000/');
      
      await page.goto('/admin');
      await expect(page.locator('text=Initializing_Terminal_Core')).not.toBeVisible({ timeout: 15000 });
    });

    test('Deve validar estatísticas e interagir com o modal de imagem', async ({ page }) => {
      await expect(page.locator('span', { hasText: /Total de Fotos/i })).toBeVisible();

      const firstCard = page.locator('.group.aspect-\\[3\\/4\\.2\\]').first();
      await firstCard.click();

      await expect(page.locator('h3.text-white')).toBeVisible();
      const copyBtn = page.getByRole('button', { name: 'Copy', exact: true });
      await expect(copyBtn).toBeVisible();

      const downloadBtn = page.getByRole('button', { name: /Download_Original_Copy/i });
      await expect(downloadBtn).toBeVisible();

      await page.locator('button >> svg.lucide-x').click();
      await expect(page.locator('h3.text-white')).not.toBeVisible();
    });

    test('Deve alternar para visualização em tabela e filtrar', async ({ page }) => {
      await page.getByTitle('Visualização em Tabela').click();
      await expect(page.locator('table')).toBeVisible();
      await expect(page.locator('th', { hasText: 'UID_System' })).toBeVisible();

      const searchInput = page.getByPlaceholder('BUSCAR POR NOME...');
      await searchInput.fill('photo');
      await expect(page.locator('span', { hasText: /Filtrado/i })).toBeVisible();
    });
  });
});