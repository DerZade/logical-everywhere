import { describe, expect, it } from 'vitest';
import { toFlexWrap } from '../src';

describe('toFlexWrap', () => {
    it('should return "nowrap" for invalid values', () => {
        expect(toFlexWrap('blub')).toBe('nowrap');
    });
    it('should accept "nowrap"', () => {
        expect(toFlexWrap('nowrap')).toBe('nowrap');
    });
    it('should accept "wrap"', () => {
        expect(toFlexWrap('wrap')).toBe('wrap');
    });
    it('should accept "wrap-reverse"', () => {
        expect(toFlexWrap('wrap-reverse')).toBe('wrap-reverse');
    });
});
