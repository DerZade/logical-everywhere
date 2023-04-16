/** CSS `direction` property */
export type CSSDirection = 'ltr' | 'rtl';

/**
 * Convert a string to concrete union of possible directions.
 */
export function toDirection(val: string): CSSDirection {
    return val === 'rtl' ? 'rtl' : 'ltr';
}

/** CSS `writing-mode` property */
export type CSSWritingMode =
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

/** CSS `flex-wrap` property */
export type CSSFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Convert a string to concrete union of possible values of `flex-wrap`.
 */
export function toFlexWrap(val: string): CSSFlexWrap {
    if (val === 'wrap') return 'wrap';
    if (val === 'wrap-reverse') return 'wrap-reverse';

    return 'nowrap';
}

/** CSS `flex-direction` property */
export type CSSFlexDirection =
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse';

/**
 * Convert a string to concrete union of possible values of `flex-direction`.
 */
export function toFlexDirection(val: string): CSSFlexDirection {
    if (val === 'row-reverse') return 'row-reverse';
    if (val === 'column') return 'column';
    if (val === 'column-reverse') return 'column-reverse';

    return 'row';
}
