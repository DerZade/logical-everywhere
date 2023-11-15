import { describe, expect, it } from 'vitest';
import { toWritingMode } from '../src';

describe('toWritingMode', () => {
    it('should return "horizontal-tb" for invalid values', () => {
        expect(toWritingMode('blub')).toBe('horizontal-tb');
    });
    it('should return "horizontal-tb" for "lr"', () => {
        expect(toWritingMode('lr')).toBe('horizontal-tb');
    });
    it('should return "horizontal-tb" for "lr-tb"', () => {
        expect(toWritingMode('lr-tb')).toBe('horizontal-tb');
    });
    it('should return "horizontal-tb" for "rl"', () => {
        expect(toWritingMode('rl')).toBe('horizontal-tb');
    });
    it('should return "vertical-lr" for "tb"', () => {
        expect(toWritingMode('tb')).toBe('vertical-lr');
    });
    it('should return "vertical-lr" for "tb-lr"', () => {
        expect(toWritingMode('tb-lr')).toBe('vertical-lr');
    });
    it('should return "vertical-rl" for "tb-rl"', () => {
        expect(toWritingMode('tb-rl')).toBe('vertical-rl');
    });
    it('should accept "horizontal-tb"', () => {
        expect(toWritingMode('horizontal-tb')).toBe('horizontal-tb');
    });
    it('should accept "vertical-rl"', () => {
        expect(toWritingMode('vertical-rl')).toBe('vertical-rl');
    });
    it('should accept "vertical-lr"', () => {
        expect(toWritingMode('vertical-lr')).toBe('vertical-lr');
    });
    it('should accept "sideways-rl"', () => {
        expect(toWritingMode('sideways-rl')).toBe('sideways-rl');
    });
    it('should accept "sideways-lr"', () => {
        expect(toWritingMode('sideways-lr')).toBe('sideways-lr');
    });
});
