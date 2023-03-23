import type { PhysicalDirection } from './index';

/**
 * A physical axis. (`{from}-{to}`)
 */
export type PhysicalAxis =
    | 'left-right'
    | 'top-bottom'
    | 'right-left'
    | 'bottom-top';

/**
 * Get from- and to-direction of a physical axis
 * @param axis Axis
 * @returns An object, containing the `start`- and `end`-direction of the axis.
 */
export function axisStartEnd(axis: PhysicalAxis): {
    start: PhysicalDirection;
    end: PhysicalDirection;
} {
    return (
        {
            'bottom-top': { start: 'bottom', end: 'top' },
            'top-bottom': { start: 'top', end: 'bottom' },
            'left-right': { start: 'left', end: 'right' },
            'right-left': { start: 'right', end: 'left' }
        } as const
    )[axis];
}

/**
 * Reverse a physical axis
 * @param axis Axis to reverse
 * @returns Reversed axis
 */
export function reverseAxis(axis: PhysicalAxis): PhysicalAxis {
    return (
        {
            'bottom-top': 'top-bottom',
            'top-bottom': 'bottom-top',
            'left-right': 'right-left',
            'right-left': 'left-right'
        } as const
    )[axis];
}

/**
 * Get dimension and direction of a physical axis.
 * @param axis Axis
 * @returns An object, containing the dimension (`"x"` or `"y"`) and a multiplier to adjust for the direction.
 */
export function axisDimensionAndDirection(axis: PhysicalAxis): {
    dimension: 'x' | 'y';
    multiplier: -1 | 1;
} {
    return (
        {
            'left-right': { dimension: 'x', multiplier: 1 },
            'top-bottom': { dimension: 'y', multiplier: 1 },
            'right-left': { dimension: 'x', multiplier: -1 },
            'bottom-top': { dimension: 'y', multiplier: -1 }
        } as const
    )[axis];
}
