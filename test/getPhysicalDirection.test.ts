import { describe, expect, it } from 'vitest';
import { getPhysicalDirection } from '../src';

describe('getPhysicalDirection', () => {
    document.body.innerHTML = `
        <style> div { display: flex; }</style>
        <div id="my-elem-h-tb" style="writing-mode: horizontal-tb"></div>
        <div id="my-elem-v-rl" style="writing-mode: vertical-rl"></div>
        <div id="my-elem-v-lr" style="writing-mode: vertical-lr"></div>
        <div id="my-elem-s-rl" style="writing-mode: sideways-rl"></div>
        <div id="my-elem-s-lr" style="writing-mode: sideways-lr"></div>
    `;

    it('should return the correct directions on LTR pages', async () => {
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
            {
                id: 'my-elem-v-lr',
                expected: ['top', 'bottom', 'left', 'right']
            },
            {
                id: 'my-elem-s-rl',
                expected: ['top', 'bottom', 'right', 'left']
            },
            { id: 'my-elem-s-lr', expected: ['bottom', 'top', 'left', 'right'] }
        ];

        for (const { id, expected } of CASES) {
            const el = document.getElementById(id);
            if (el === null) throw new Error('Failed to get element');

            const directions = (
                [
                    'inline-start',
                    'inline-end',
                    'block-start',
                    'block-end'
                ] as const
            ).map((d) => getPhysicalDirection(el, d));

            expect(directions, `wrong direction for id "${id}"`).toStrictEqual(
                expected
            );
        }
    });

    it('should return the correct directions on RTL pages', async () => {
        document.dir = 'rtl';

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
            {
                id: 'my-elem-v-lr',
                expected: ['bottom', 'top', 'left', 'right']
            },
            {
                id: 'my-elem-s-rl',
                expected: ['bottom', 'top', 'right', 'left']
            },
            { id: 'my-elem-s-lr', expected: ['top', 'bottom', 'left', 'right'] }
        ];

        for (const { id, expected } of CASES) {
            const el = document.getElementById(id);
            if (el === null) throw new Error('Failed to get element');

            const directions = (
                [
                    'inline-start',
                    'inline-end',
                    'block-start',
                    'block-end'
                ] as const
            ).map((d) => getPhysicalDirection(el, d));

            expect(directions, `wrong direction for id "${id}"`).toStrictEqual(
                expected
            );
        }
    });
});
