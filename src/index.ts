import { type PhysicalAxis, axisStartEnd, reverseAxis } from './axis';
import {
    type CSSWritingMode,
    toWritingMode,
    type CSSDirection,
    toDirection
} from './css';

export * from './axis';
export * from './css';

/** A logical direction */
export type LogicalDirection = `${'inline' | 'block'}-${'start' | 'end'}`;

/** A physical direction */
export type PhysicalDirection = 'top' | 'bottom' | 'right' | 'left';

/**
 * An object containing the physical axes corresponding to the logical axes
 */
export interface Axes {
    block: PhysicalAxis;
    inline: PhysicalAxis;
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
