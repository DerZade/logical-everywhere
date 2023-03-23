/** A logical direction */
export type LogicalDirection = `${'inline' | 'block'}-${'start' | 'end'}`;

/** A physical direction */
export type PhysicalDirection = 'top' | 'bottom' | 'right' | 'left';

/**
 * A physical axis. (`{from}-{to}`)
 */
export type PhysicalAxis =
    | 'left-right'
    | 'top-bottom'
    | 'right-left'
    | 'bottom-top';

/**
 * An object containing the physical axes corresponding to the logical axes
 */
export interface Axes {
    block: PhysicalAxis;
    inline: PhysicalAxis;
}

/** CSS `writing-mode` property */
type CSSWritingMode =
    | 'horizontal-tb'
    | 'vertical-rl'
    | 'vertical-lr'
    | 'sideways-rl'
    | 'sideways-lr';

/**
 * Convert a string to concrete union of possible writing modes.
 */
export function toWritingMode(val: string): CSSWritingMode {
    const writingMode = (
        {
            'horizontal-tb': 'horizontal-tb',
            'vertical-rl': 'vertical-rl',
            'vertical-lr': 'vertical-lr',
            'sideways-rl': 'sideways-rl',
            'sideways-lr': 'sideways-lr',
            lr: 'horizontal-tb',
            'lr-tb': 'horizontal-tb',
            rl: 'horizontal-tb',
            tb: 'vertical-lr',
            'tb-lr': 'vertical-lr',
            'tb-rl': 'vertical-rl'
        } as const
    )[val];

    return writingMode ?? 'horizontal-tb';
}

/** CSS `direction` property */
type CSSDirection = 'ltr' | 'rtl';

/**
 * Convert a string to concrete union of possible directions.
 */
export function toDirection(val: string): CSSDirection {
    return val === 'rtl' ? 'rtl' : 'ltr';
}

/** Object mapping WritingMode and Direction to axes */
export const AXES_MAP = {
    'horizontal-tb': {
        ltr: { inline: 'left-right', block: 'top-bottom' },
        rtl: { inline: 'right-left', block: 'top-bottom' }
    },
    'vertical-rl': {
        ltr: { inline: 'top-bottom', block: 'right-left' },
        rtl: { inline: 'bottom-top', block: 'right-left' }
    },
    'vertical-lr': {
        ltr: { inline: 'top-bottom', block: 'left-right' },
        rtl: { inline: 'bottom-top', block: 'left-right' }
    },
    'sideways-rl': {
        ltr: { inline: 'top-bottom', block: 'right-left' },
        rtl: { inline: 'bottom-top', block: 'right-left' }
    },
    'sideways-lr': {
        ltr: { inline: 'bottom-top', block: 'left-right' },
        rtl: { inline: 'top-bottom', block: 'left-right' }
    }
} satisfies { [wm in CSSWritingMode]: { [dir in CSSDirection]: Axes } };

/**
 * Get inline- and block-axis of a HTML element.
 * @param el HTML Element
 * @returns An object, containing `inline`- and `block`-axis
 */
export function getElementAxes(el: HTMLElement): Axes {
    const { writingMode: writingModeStr, direction: directionStr } =
        getComputedStyle(el);

    const writingMode = toWritingMode(writingModeStr);
    const direction = toDirection(directionStr);

    return AXES_MAP[writingMode][direction];
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
 * Get the physical direction that corresponds to the logical direction of a element.
 *
 * @param el Element to get directions for
 * @param logicalDirection Logical direction
 * @returns Physical direction representing the logical direction
 */
export function getPhysicalDirection(
    el: HTMLElement,
    logicalDirection: LogicalDirection
): PhysicalDirection {
    const { inline, block } = getElementAxes(el);

    switch (logicalDirection) {
        case 'inline-start':
            return axisStartEnd(inline).start;

        case 'inline-end':
            return axisStartEnd(inline).end;

        case 'block-start':
            return axisStartEnd(block).start;

        case 'block-end':
            return axisStartEnd(block).end;
    }
}

/**
 * Get physical axis of the `flex-direction` CSS property.
 *
 * @param el HTML Element
 */
export function getPhysicalFlexDirection(el: HTMLElement): PhysicalAxis {
    const { inline, block } = getElementAxes(el);

    const { flexDirection } = getComputedStyle(el);

    switch (flexDirection) {
        case 'row-reverse':
            return reverseAxis(inline);
        case 'column':
            return block;
        case 'column-reverse':
            return reverseAxis(block);
        default:
            return inline;
    }
}
