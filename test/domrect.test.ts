import { describe, expect, it } from 'vitest';
import { LogicalDOMRect } from '../src';

describe('LogicalDOMRect', () => {
    it('should work with "left-right" / "top-bottom"', () => {
        const rect = new DOMRect(0, 11, 22, 33);
        const logicalRect = new LogicalDOMRect(
            rect,
            'left-right',
            'top-bottom'
        );

        expect(logicalRect.inlineStart).toBe(logicalRect.left);
        expect(logicalRect.inlineEnd).toBe(logicalRect.right);
        expect(logicalRect.blockStart).toBe(logicalRect.top);
        expect(logicalRect.blockEnd).toBe(logicalRect.bottom);
        expect(logicalRect.inlineSize).toBe(logicalRect.width);
        expect(logicalRect.blockSize).toBe(logicalRect.height);
    });

    it('should work with "bottom-top" / "right-left"', () => {
        const rect = new DOMRect(0, 11, 22, 33);
        const logicalRect = new LogicalDOMRect(
            rect,
            'bottom-top',
            'right-left'
        );

        expect(logicalRect.inlineStart).toBe(logicalRect.bottom);
        expect(logicalRect.inlineEnd).toBe(logicalRect.top);
        expect(logicalRect.blockStart).toBe(logicalRect.right);
        expect(logicalRect.blockEnd).toBe(logicalRect.left);
        expect(logicalRect.inlineSize).toBe(logicalRect.height);
        expect(logicalRect.blockSize).toBe(logicalRect.width);
    });
});
