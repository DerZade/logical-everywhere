import { describe, expect, it } from 'vitest';
import { getBoundingClientLogicalRect } from '../src';

/**
 * Style for a fixed position element.
 * will result in a 3x5 rectangle at (1, 2), which
 * results in left, top, right, bottom, width, height
 *  all having distinct values.
 */
const POS_STYLE = 'position: fixed; left: 1px; top: 2px; width: 3px; height: 5px';


describe('getBoundingClientLogicalRect', () => {
    it('should work for ltr / horizontal-tb', async () => {
        document.body.innerHTML = `
            <div id="my-elem" style="writing-mode: horizontal-tb; ${POS_STYLE}"></div>
        `;

        const el = document.getElementById('my-elem');
        if (el === null) throw new Error('Failed to get element');

        const rect = getBoundingClientLogicalRect(el);

        expect(rect.inlineStart).toBe(rect.left);
        expect(rect.inlineEnd).toBe(rect.right);
        expect(rect.blockStart).toBe(rect.top);
        expect(rect.blockEnd).toBe(rect.bottom);
        expect(rect.inlineSize).toBe(rect.width);
        expect(rect.blockSize).toBe(rect.height);
    });

    it('should work for rtl / horizontal-tb', async () => {
        document.dir = 'rtl';
        document.body.innerHTML = `
            <div id="my-elem" style="writing-mode: horizontal-tb; ${POS_STYLE}"></div>
        `;

        const el = document.getElementById('my-elem');
        if (el === null) throw new Error('Failed to get element');

        const rect = getBoundingClientLogicalRect(el);

        expect(rect.inlineStart).toBe(rect.right);
        expect(rect.inlineEnd).toBe(rect.left);
        expect(rect.blockStart).toBe(rect.top);
        expect(rect.blockEnd).toBe(rect.bottom);
        expect(rect.inlineSize).toBe(rect.width);
        expect(rect.blockSize).toBe(rect.height);
    });
});
