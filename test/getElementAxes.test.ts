import { describe, expect, it } from 'vitest';
import { getElementAxes } from '../src';

describe('getElementAxes', () => {
    document.body.innerHTML = `
        <style> div { display: flex; }</style>
        <div id="my-elem-h-tb" style="writing-mode: horizontal-tb"></div>
        <div id="my-elem-v-rl" style="writing-mode: vertical-rl"></div>
        <div id="my-elem-v-lr" style="writing-mode: vertical-lr"></div>
        <div id="my-elem-s-rl" style="writing-mode: sideways-rl"></div>
        <div id="my-elem-s-lr" style="writing-mode: sideways-lr"></div>
    `;

    it('should return the correct axes on LTR pages', async () => {
        // see https://drafts.csswg.org/css-writing-modes/#logical-to-physical
        const CASES = [
            { id: 'my-elem-h-tb', block: 'top-bottom', inline: 'left-right' },
            { id: 'my-elem-v-rl', block: 'right-left', inline: 'top-bottom' },
            { id: 'my-elem-v-lr', block: 'left-right', inline: 'top-bottom' },
            { id: 'my-elem-s-rl', block: 'right-left', inline: 'top-bottom' },
            { id: 'my-elem-s-lr', block: 'left-right', inline: 'bottom-top' }
        ];

        for (const { id, ...expected } of CASES) {
            const el = document.getElementById(id);
            if (el === null) throw new Error('Failed to get element');

            expect(getElementAxes(el), `wrong axes for id "${id}"`).toStrictEqual(expected)
        }
    });

    it('should return the correct axes on RTL pages', async () => {
        document.dir = 'rtl';

        // see https://drafts.csswg.org/css-writing-modes/#logical-to-physical
        const CASES = [
            { id: 'my-elem-h-tb', block: 'top-bottom', inline: 'right-left' },
            { id: 'my-elem-v-rl', block: 'right-left', inline: 'bottom-top' },
            { id: 'my-elem-v-lr', block: 'left-right', inline: 'bottom-top' },
            { id: 'my-elem-s-rl', block: 'right-left', inline: 'bottom-top' },
            { id: 'my-elem-s-lr', block: 'left-right', inline: 'top-bottom' }
        ];

        for (const { id, ...expected } of CASES) {
            const el = document.getElementById(id);
            if (el === null) throw new Error('Failed to get element');

            expect(getElementAxes(el), `wrong axes for id "${id}"`).toStrictEqual(expected)
        }
    });
});
