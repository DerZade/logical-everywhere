import {
    type PhysicalAxis,
    type PhysicalDirection,
    axisDimensionAndDirection,
    axisStartEnd
} from './index';

const DIMENSION_TO_PROPERTY = {
    x: 'width',
    y: 'height'
} as const;

export class LogicalDOMRect extends DOMRect {
    public readonly blockAxis: PhysicalAxis;
    public readonly inlineAxis: PhysicalAxis;

    private readonly inlineStartDirection: PhysicalDirection;
    private readonly inlineEndDirection: PhysicalDirection;
    private readonly blockStartDirection: PhysicalDirection;
    private readonly blockEndDirection: PhysicalDirection;

    private readonly inlineProperty: 'width' | 'height';
    private readonly blockProperty: 'width' | 'height';

    public constructor(
        rect: DOMRect,
        inlineAxis: PhysicalAxis,
        blockAxis: PhysicalAxis
    ) {
        super(rect.x, rect.y, rect.width, rect.height);

        this.inlineAxis = inlineAxis;
        this.blockAxis = blockAxis;

        const { start: inlineStart, end: inlineEnd } = axisStartEnd(inlineAxis);
        const { start: blockStart, end: blockEnd } = axisStartEnd(blockAxis);

        this.inlineStartDirection = inlineStart;
        this.inlineEndDirection = inlineEnd;
        this.blockStartDirection = blockStart;
        this.blockEndDirection = blockEnd;

        this.inlineProperty =
            DIMENSION_TO_PROPERTY[
            axisDimensionAndDirection(inlineAxis).dimension
            ];
        this.blockProperty =
            DIMENSION_TO_PROPERTY[
            axisDimensionAndDirection(blockAxis).dimension
            ];
    }

    public get inlineStart(): number {
        return this[this.inlineStartDirection];
    }

    public get inlineEnd(): number {
        return this[this.inlineEndDirection];
    }

    public get blockStart(): number {
        return this[this.blockStartDirection];
    }

    public get blockEnd(): number {
        return this[this.blockEndDirection];
    }

    public get inlineSize(): number {
        return this[this.inlineProperty];
    }

    public get blockSize(): number {
        return this[this.blockProperty];
    }
}
