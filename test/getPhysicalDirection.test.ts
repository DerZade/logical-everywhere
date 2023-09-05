import { describe, expect, it } from 'vitest';
import { setupBrowser } from './setupBrowser';

describe('getPhysicalDirection', () => {
    const getPage = setupBrowser();

    it('should return the correct directions on LTR pages', async () => {
        const page = getPage();

        // see https://drafts.csswg.org/css-writing-modes/#logical-to-physical
        const CASES = [
            {
                id: 'my-elem-h-tb',
                expected: ['left', 'right', 'top', 'bottom']
            },
            {
                id: 'my-elem-v-rl',
                expected: ['top', 'bottom', 'right', 'left']
            },
            { id: 'my-elem-v-lr', expected: ['top', 'bottom', 'left', 'right'] }
            // TODO: uncomment once chrome supports writing-mode sideways-rl / sideways-lr
            // { id: 'my-elem-s-rl', expected: ['top', 'bottom', 'right', 'left'] },
            // { id: 'my-elem-s-lr', expected: ['bottom', 'top', 'left', 'right'] }
        ];

        const promises = CASES.map(({ id, expected }) =>
            page
                .evaluate(
                    (id) =>
                        [
                            'inline-start',
                            'inline-end',
                            'block-start',
                            'block-end'
                        ].map((d) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            getPhysicalDirection(document.getElementById(id), d)
                        ),
                    id
                )
                .then((ret) =>
                    expect(ret, `wrong direction for id "${id}"`).toStrictEqual(
                        expected
                    )
                )
        );

        await Promise.all(promises);
    });

    it('should return the correct directions on RTL pages', async () => {
        const page = getPage();

        await page.evaluate(() => {
            document.dir = 'rtl';
        });

        // see https://drafts.csswg.org/css-writing-modes/#logical-to-physical
        const CASES = [
            {
                id: 'my-elem-h-tb',
                expected: ['right', 'left', 'top', 'bottom']
            },
            {
                id: 'my-elem-v-rl',
                expected: ['bottom', 'top', 'right', 'left']
            },
            { id: 'my-elem-v-lr', expected: ['bottom', 'top', 'left', 'right'] }
            // TODO: uncomment once chrome supports writing-mode sideways-rl / sideways-lr
            // { id: 'my-elem-s-rl', expected: ['bottom', 'top', 'right', 'left'] },
            // { id: 'my-elem-s-lr', expected: ['top', 'bottom', 'left', 'right'] }
        ];

        const promises = CASES.map(({ id, expected }) =>
            page
                .evaluate(
                    (id) =>
                        [
                            'inline-start',
                            'inline-end',
                            'block-start',
                            'block-end'
                        ].map((d) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            getPhysicalDirection(document.getElementById(id), d)
                        ),
                    id
                )
                .then((ret) =>
                    expect(ret, `wrong direction for id "${id}"`).toStrictEqual(
                        expected
                    )
                )
        );

        await Promise.all(promises);
    });
});
