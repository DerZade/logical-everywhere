import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul'
        },
        browser: {
            enabled: true,
            provider: 'webdriverio',
            // https://vitest.dev/guide/browser/playwright
            configs: [
                { browser: 'chromium' },
                { browser: 'firefox' },
                { browser: 'webkit' }
            ]
        }
    }
});
