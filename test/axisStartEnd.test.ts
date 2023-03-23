import { describe, expect, it } from 'vitest';
import { axisStartEnd } from '../src';

describe('axisStartEnd', () => {
    it('should return correct start and end for "bottom-top"', () => {
        const val = axisStartEnd('bottom-top');
        expect(val.start).toBe('bottom');
        expect(val.end).toBe('top');
    });
    it('should return correct start and end for "top-bottom"', () => {
        const val = axisStartEnd('top-bottom');
        expect(val.start).toBe('top');
        expect(val.end).toBe('bottom');
    });
    it('should return correct start and end for "left-right"', () => {
        const val = axisStartEnd('left-right');
        expect(val.start).toBe('left');
        expect(val.end).toBe('right');
    });
    it('should return correct start and end for "right-left"', () => {
        const val = axisStartEnd('right-left');
        expect(val.start).toBe('right');
        expect(val.end).toBe('left');
    });
});
