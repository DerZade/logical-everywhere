import { describe, expect, it } from 'vitest';
import { reverseAxis } from '../src';

describe('reverseAxis', () => {
    it('should reverse "bottom-top" correctly', () => {
        expect(reverseAxis('bottom-top')).toBe('top-bottom');
    });
    it('should reverse "top-bottom" correctly', () => {
        expect(reverseAxis('top-bottom')).toBe('bottom-top');
    });
    it('should reverse "left-right" correctly', () => {
        expect(reverseAxis('left-right')).toBe('right-left');
    });
    it('should reverse "right-left" correctly', () => {
        expect(reverseAxis('right-left')).toBe('left-right');
    });
});
