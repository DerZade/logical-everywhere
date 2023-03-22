import { describe, expect, it } from 'vitest';
import { setupBrowser } from './setupBrowser';

describe('getElementAxes', () => {
    const getPage = setupBrowser();

    it('should return the correct axes on LTR pages', async () => {
        const page = getPage();

        const CASES = [
            { id: 'my-elem-h-tb', block: 'top-bottom', inline: 'left-right' },
            { id: 'my-elem-v-rl', block: 'right-left', inline: 'top-bottom' },
            { id: 'my-elem-v-lr', block: 'left-right', inline: 'top-bottom' }
            // TODO: uncomment once chrome supports writing-mode sideways-rl / sideways-lr
            // { id: 'my-elem-s-rl', block: 'right-left', inline: 'top-bottom' },
            // { id: 'my-elem-s-lr', block: 'left-right', inline: 'top-bottom' }
        ];

        const promises = CASES.map(({ id, ...expected }) =>
            page
                .evaluate(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (id) => getElementAxes(document.getElementById(id)),
                    id
                )
                .then((ret) =>
                    expect(ret, `wrong axes for id "${id}"`).toStrictEqual(
                        expected
                    )
                )
        );

        await Promise.all(promises);
    });

    it('should return the correct axes on RTL pages', async () => {
        const page = getPage();

        await page.evaluate(() => {
            document.dir = 'rtl';
        });

        const CASES = [
            { id: 'my-elem-h-tb', block: 'top-bottom', inline: 'right-left' },
            { id: 'my-elem-v-rl', block: 'right-left', inline: 'bottom-top' },
            { id: 'my-elem-v-lr', block: 'left-right', inline: 'bottom-top' }
            // TODO: uncomment once chrome supports writing-mode sideways-rl / sideways-lr
            // { id: 'my-elem-s-rl', block: 'right-left', inline: 'bottom-top' },
            // { id: 'my-elem-s-lr', block: 'left-right', inline: 'bottom-top' }
        ];

        const promises = CASES.map(({ id, ...expected }) =>
            page
                .evaluate(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (id) => getElementAxes(document.getElementById(id)),
                    id
                )
                .then((ret) =>
                    expect(ret, `wrong axes for id "${id}"`).toStrictEqual(
                        expected
                    )
                )
        );

        await Promise.all(promises);
    });
});
