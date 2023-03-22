import { afterAll, beforeAll, beforeEach } from 'vitest';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import { preview, build } from 'vite';
import type { PreviewServer } from 'vite';

export function setupBrowser() {
    let browser: Browser;
    let page: Page;
    let server: PreviewServer;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        await build({
            root: './test/test-app'
        });
        server = await preview({
            preview: { port: 3000 },
            root: './test/test-app'
        });
        await page.goto('http://localhost:3000');
    });

    beforeEach(async () => {
        await page.goto('http://localhost:3000');
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
