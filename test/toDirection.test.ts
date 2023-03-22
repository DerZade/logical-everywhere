import { describe, expect, it } from 'vitest';
import { toDirection } from '../src';

describe('toWritingMode', () => {
    it('should return ltr for invalid values', () => {
        expect(toDirection('blub')).toBe('ltr');
    });
    it('should accept "rtl"', () => {
        expect(toDirection('rtl')).toBe('rtl');
    });
    it('should accept "ltr"', () => {
        expect(toDirection('ltr')).toBe('ltr');
    });
});
