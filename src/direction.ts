/** CSS `direction` property */
export type CSSDirection = 'ltr' | 'rtl';

/**
 * Convert a string to concrete union of possible directions.
 */
export function toDirection(val: string): CSSDirection {
    return val === 'rtl' ? 'rtl' : 'ltr';
}
