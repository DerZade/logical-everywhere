import { describe, expect, it } from 'vitest';
import { axisDimensionAndDirection } from '../src';

describe('axisDimensionAndDirection', () => {
    it('should return correct dimension and direction for "bottom-top"', () => {
        const val = axisDimensionAndDirection('bottom-top');
        expect(val.dimension).toBe('y');
        expect(val.multiplier).toBe(-1);
    });
    it('should return correct dimension and direction for "top-bottom"', () => {
        const val = axisDimensionAndDirection('top-bottom');
        expect(val.dimension).toBe('y');
        expect(val.multiplier).toBe(1);
    });
    it('should return correct dimension and direction for "left-right"', () => {
        const val = axisDimensionAndDirection('left-right');
        expect(val.dimension).toBe('x');
        expect(val.multiplier).toBe(1);
    });
    it('should return correct dimension and direction for "right-left"', () => {
        const val = axisDimensionAndDirection('right-left');
        expect(val.dimension).toBe('x');
        expect(val.multiplier).toBe(-1);
    });
});
