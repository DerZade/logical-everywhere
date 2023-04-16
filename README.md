# Logical Properties EVERYWHERE

_Collection of utilities to work around features that are not fully compatible with logical properties (such as [`translateX`](https://developer.mozilla.org/docs/Web/CSS/transform-function/translateX), [`translateY`](https://developer.mozilla.org/docs/Web/CSS/transform-function/translateY) or [`getBoundingClientRect`](https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect))._

## Motivation

When positioning elements with JS, it is difficult to work with logical properties in mind. For example, if I want to display a tooltip in the `block-start `direction of an element (usually physically above), I first need to know where the inline and block axes are located in order to then position the tooltip in the correct physical direction (`top`, `left`, `bottom` or `right`):

This package aims to simplifies this process.

## Installation

```
npm i --save logical-properties-everywhere
```

## Utilities

### `getPhysicalDirection`

Get the physical direction that corresponds to the logical direction of a element.

```ts
const myElement = document.getElementById('my-element');

const physicalDirection = getPhysicalDirection(myElement, 'inline-start');

console.log(physicalDirection); // prints "left"
```

### `getPhysicalFlexAxes`

Get flexbox's [main- and cross-axis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#the_two_axes_of_flexbox) as physical axes.

```ts
const myElement = document.getElementById('my-element');

myElement.style.flexDirection = 'row-reverse';
const axesRR = getPhysicalFlexAxes(myElement);
console.log(axesRR.main); // prints "right-left"

myElement.style.flexDirection = 'column-reverse';
const axesCR = getPhysicalFlexAxes(myElement);
console.log(axesCR.main); // prints "bottom-top"
```

### `getElementAxes`

Get inline- and block-axis of a HTML element.

```ts
const { block, inline } = getElementAxes(myElement);

console.log(inline); // prints "left-right"
console.log(block); // prints "top-bottom"
```

### `axisDimensionAndDirection`

Get dimension and direction of a physical axis.

This is especially useful when trying to calculate a dynamic `translateX` / `translateY`.

```ts
const myElement = document.getElementById('my-element');

const { inline } = getElementAxes(myElement);

const { dimension, multiplier } = axisDimensionAndDirection(inline);

const transform = `translate${dimension.toUpperCase()}(${3 * multiplier})`;
```

### `axisStartEnd`

Get from- and to-direction of a physical axis.

```ts
const { start, end } = axisStartEnd('top-bottom');
console.log(start); // prints "top"
console.log(end); // prints "bottom"
```

### `reverseAxis`

Reverse a physical axis

```ts
const reversed = reverseAxis('top-bottom');

console.log(reversed); // prints "bottom-top"
```
