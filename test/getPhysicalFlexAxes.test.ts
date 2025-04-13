import { describe, expect, it } from 'vitest';
import { CSSFlexDirection, CSSFlexWrap, getPhysicalFlexAxes, PhysicalAxis } from '../src';

describe('getPhysicalFlexAxes', () => {
    document.body.innerHTML = `
        <style> div { display: flex; }</style>
        <div id="my-elem-h-tb" style="writing-mode: horizontal-tb"></div>
        <div id="my-elem-v-rl" style="writing-mode: vertical-rl"></div>
        <div id="my-elem-v-lr" style="writing-mode: vertical-lr"></div>
        <div id="my-elem-s-rl" style="writing-mode: sideways-rl"></div>
        <div id="my-elem-s-lr" style="writing-mode: sideways-lr"></div>
    `;

    const CASES: {
        [htmlDir in 'ltr' | 'rtl']: {
            [flexDir in CSSFlexDirection]: {
                [wrap in Exclude<CSSFlexWrap, 'nowrap'>]: {
                    [id: string]: { main: PhysicalAxis; cross: PhysicalAxis };
                };
            };
        };
    } = {
        ltr: {
            row: {
                wrap: {
                    'my-elem-h-tb': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-v-rl': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-v-lr': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-s-rl': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-s-lr': { main: 'bottom-top', cross: 'left-right' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-v-rl': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-v-lr': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-s-rl': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-s-lr': { main: 'bottom-top', cross: 'right-left' }
                }
            },
            'row-reverse': {
                wrap: {
                    'my-elem-h-tb': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-v-rl': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-v-lr': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-s-rl': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-s-lr': { main: 'top-bottom', cross: 'left-right' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-v-rl': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-v-lr': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-s-rl': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-s-lr': { main: 'top-bottom', cross: 'right-left' }
                }
            },
            column: {
                wrap: {
                    'my-elem-h-tb': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-v-rl': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-v-lr': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-s-rl': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-s-lr': { main: 'left-right', cross: 'bottom-top' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-v-rl': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-v-lr': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-s-rl': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-s-lr': { main: 'left-right', cross: 'top-bottom' }
                }
            },
            'column-reverse': {
                wrap: {
                    'my-elem-h-tb': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-v-rl': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-v-lr': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-s-rl': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-s-lr': { main: 'right-left', cross: 'bottom-top' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-v-rl': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-v-lr': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-s-rl': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-s-lr': { main: 'right-left', cross: 'top-bottom' }
                }
            }
        },
        rtl: {
            row: {
                wrap: {
                    'my-elem-h-tb': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-v-rl': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-v-lr': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-s-rl': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-s-lr': { main: 'top-bottom', cross: 'left-right' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-v-rl': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-v-lr': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-s-rl': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-s-lr': { main: 'top-bottom', cross: 'right-left' }
                }
            },
            'row-reverse': {
                wrap: {
                    'my-elem-h-tb': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-v-rl': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-v-lr': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-s-rl': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-s-lr': { main: 'bottom-top', cross: 'left-right' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-v-rl': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-v-lr': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-s-rl': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-s-lr': { main: 'bottom-top', cross: 'right-left' }
                }
            },
            column: {
                wrap: {
                    'my-elem-h-tb': { main: 'top-bottom', cross: 'right-left' },
                    'my-elem-v-rl': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-v-lr': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-s-rl': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-s-lr': { main: 'left-right', cross: 'top-bottom' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'top-bottom', cross: 'left-right' },
                    'my-elem-v-rl': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-v-lr': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-s-rl': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-s-lr': { main: 'left-right', cross: 'bottom-top' }
                }
            },
            'column-reverse': {
                wrap: {
                    'my-elem-h-tb': { main: 'bottom-top', cross: 'right-left' },
                    'my-elem-v-rl': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-v-lr': { main: 'right-left', cross: 'bottom-top' },
                    'my-elem-s-rl': { main: 'left-right', cross: 'bottom-top' },
                    'my-elem-s-lr': { main: 'right-left', cross: 'top-bottom' }
                },
                'wrap-reverse': {
                    'my-elem-h-tb': { main: 'bottom-top', cross: 'left-right' },
                    'my-elem-v-rl': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-v-lr': { main: 'right-left', cross: 'top-bottom' },
                    'my-elem-s-rl': { main: 'left-right', cross: 'top-bottom' },
                    'my-elem-s-lr': { main: 'right-left', cross: 'bottom-top' }
                }
            }
        }
    };

    for (const htmlDir of ['ltr', 'rtl'] as const) {
        for (const flexDirection of [
            'row',
            'row-reverse',
            'column',
            'column-reverse'
        ] as const) {
            for (const flexWrap of ['wrap', 'wrap-reverse'] as const) {
                const cases = CASES[htmlDir][flexDirection][flexWrap];

                it(`should return the correct axes for ${htmlDir.toUpperCase()} pages with a "flex-direction" of "${flexDirection}" and a "flex-wrap" of "${flexWrap}"`, async () => {
                    document.dir = htmlDir;

                    for (const [id, expected] of Object.entries(cases)) {
                        const element = document.getElementById(id);

                        if (element === null) throw new Error("Couldn't get element");

                        element.style.flexDirection =
                            flexDirection;
                        element.style.flexWrap = flexWrap;

                        const axes = getPhysicalFlexAxes(element);

                        expect(
                            axes,
                            `wrong axes for id "${id}" (${htmlDir} / ${flexDirection} / ${flexWrap})`
                        ).toStrictEqual(expected)
                    }
                });
            }
        }
    }
});
