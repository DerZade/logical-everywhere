import { afterAll, beforeAll, beforeEach } from 'vitest';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import { preview, build } from 'vite';
import type { PreviewServer } from 'vite';

export function setupBrowser() {
    let browser: Browser;
    let page: Page;
    let server: PreviewServer;
    const port = 30000 + Math.floor(Math.random() * 1000);

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        await build({
            root: './test/test-app'
        });
        server = await preview({
            preview: { port },
            root: './test/test-app'
        });
        await page.goto(`http://localhost:${port}`);
    });

    beforeEach(async () => {
        await page.goto(`http://localhost:${port}`);
    });

    afterAll(async () => {
        await browser.close();
        await new Promise<void>((resolve, reject) => {
            server.httpServer.close((error) =>
                error ? reject(error) : resolve()
            );
        });
    });

    return () => page;
}
