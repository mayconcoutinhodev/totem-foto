import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação e Permissões', () => {

  test('Deve exibir erro ao tentar logar com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'errado@nexlab.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button:has-text("Autenticar Sessão")');

    const errorMsg = page.locator('text=Falha na autenticação'); 
    await expect(errorMsg).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });

  test('Deve logar admin com sucesso e ir para a home', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'admin@local.com');
    await page.fill('input[type="password"]', 'admin'); 
    await page.click('button:has-text("Autenticar Sessão")');
    await expect(page).toHaveURL('http://127.0.0.1:3000/');
  });

    test('Deve logar promotor com sucesso e ir para a Home', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[placeholder="OPERATOR@NEXLAB.COM"]', 'promotor@local.com');
    await page.fill('input[type="password"]', 'promotor'); 
    await page.click('button:has-text("Autenticar Sessão")');
    await expect(page).toHaveURL('http://127.0.0.1:3000/');
  });
});