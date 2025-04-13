import { describe, expect, it } from 'vitest';
import { setupBrowser } from './setupBrowser';
import { CSSFlexDirection, CSSFlexWrap, PhysicalAxis } from '../src';

describe('getPhysicalFlexAxes', () => {
    const getPage = setupBrowser();

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
                    const page = getPage();

                    await page.evaluate((htmlDir) => {
                        document.dir = htmlDir;
                    }, htmlDir);

                    const promises = Object.entries(cases).map(
                        ([id, expected]) =>
                            page
                                .evaluate(
                                    (id, flexDirection, flexWrap) => {
                                        const element =
                                            document.getElementById(id);

                                        if (element === null)
                                            throw new Error(
                                                "Couldn't get element"
                                            );

                                        element.style.flexDirection =
                                            flexDirection;
                                        element.style.flexWrap = flexWrap;

                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        return getPhysicalFlexAxes(element);
                                    },
                                    id,
                                    flexDirection,
                                    flexWrap
                                )
                                .then((ret) =>
                                    expect(
                                        ret,
                                        `wrong axes for id "${id}" (${htmlDir} / ${flexDirection} / ${flexWrap})`
                                    ).toStrictEqual(expected)
                                )
                    );

                    await Promise.all(promises);
                });
            }
        }
    }
});
