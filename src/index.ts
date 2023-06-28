import { type PhysicalAxis, axisStartEnd, reverseAxis } from './axis';
import {
    type CSSWritingMode,
    toWritingMode,
    type CSSDirection,
    toDirection,
    toFlexWrap,
    toFlexDirection
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
export function getElementAxes(el: Element): Axes {
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
    el: Element,
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
 * An object containing the physical axes corresponding to the flex-axes of an element
 */
export interface FlexAxes {
    main: PhysicalAxis;
    cross: PhysicalAxis;
}

/**
 * Get flexbox's main- and cross-axis as physical axes.
 *
 * @param el HTML Element
 */
export function getPhysicalFlexAxes(el: Element): FlexAxes {
    const { inline, block } = getElementAxes(el);

    const { flexDirection: flexDirectionStr, flexWrap: flexWrapStr } =
        getComputedStyle(el);

    const flexDirection = toFlexDirection(flexDirectionStr);

    let main: PhysicalAxis;
    let cross: PhysicalAxis;

    switch (flexDirection) {
        case 'row':
            main = inline;
            cross = block;
            break;
        case 'row-reverse':
            main = reverseAxis(inline);
            cross = block;
            break;
        case 'column':
            main = block;
            cross = inline;
            break;
        case 'column-reverse':
            main = reverseAxis(block);
            cross = inline;
            break;
    }

    const flexWrap = toFlexWrap(flexWrapStr);
    if (flexWrap === 'wrap-reverse') cross = reverseAxis(cross);

    return { main, cross };
}
