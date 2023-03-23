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
