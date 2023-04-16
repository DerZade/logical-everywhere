/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    getElementAxes,
    getPhysicalDirection,
    getPhysicalFlexAxes
} from 'logical-everywhere';

// @ts-ignore
window.getElementAxes = getElementAxes;
// @ts-ignore
window.getPhysicalDirection = getPhysicalDirection;
// @ts-ignore
window.getPhysicalFlexAxes = getPhysicalFlexAxes;
