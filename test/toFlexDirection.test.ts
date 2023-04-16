import { describe, expect, it } from 'vitest';
import { toFlexDirection } from '../src';

describe('toFlexDirection', () => {
    it('should return row for invalid values', () => {
        expect(toFlexDirection('blub')).toBe('row');
    });
    it('should accept "row"', () => {
        expect(toFlexDirection('row')).toBe('row');
    });
    it('should accept "row-reverse"', () => {
        expect(toFlexDirection('row-reverse')).toBe('row-reverse');
    });
    it('should accept "column"', () => {
        expect(toFlexDirection('column')).toBe('column');
    });
    it('should accept "column-reverse"', () => {
        expect(toFlexDirection('column-reverse')).toBe('column-reverse');
    });
});
