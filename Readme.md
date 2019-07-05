# react-lazy-load-component

A react component that allows lazy components to load once they are in viewpoint. It uses the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Once a component is triggered to load, it will stay loaded (does not unload).


[![Edit use-intersection-observer example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/54r7k92m04?fontsize=14)

- [Motivation](#motivation)
- [Installation](#installation)
- [API docs](#api)
  - [Return value](#wip)
- [Example usage](#example-usage)

## Motivation

Often for large pages it would be ideal to not load components below the fold to improve performance.

## Installation

`npm install react-lazy-load-component`

Please note that this hook declares `react` and as _peer dependency_. Therefore, you must have
`react` installed to use this package.

**Note**: This hook relies on
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
and hence if you want to use it in a browser that doesn't support it, the onus of shipping the
polyfill is on the developer.

## Example usage

A CRA based example app (which is also used in the test suite) can be found under
[examples/cra](examples/cra). Inline examples showcasing use-cases are below.

### Example 1: Element with its parent document as viewport

As soon as at least 1px of the child element is visible in the parent document viewport,
`isInViewport` evaluates to true.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import LazyLoadComp from 'react-lazy-load-component'

const MyBigComponent = React.lazy( () => import('./MyBigComponent')); // your component to load

export default function SimpleElement() {
  return (
    <LazyLoadComp fallback={<h1>loading</h1>} width="300" height="300">
      <MyBigComponent/>
    </LazyLoadComp>
  )
}
```

## API

### react-lazy-load-component props

```typescript
interface IProps {
  width?: number; // optional: set the height of the placeholder space. Default: 400
  height?: number; // optional: set the width of the placeholder space. Default: 300
  fallback?: FallbackType; // optional:  set a fallback component while loading. Default: null (nothing)
  threshold?: number; // optional: the percentage of the component in-viewpoint to start loading process. Default: 0.1%
  onVisibleChange?: (visible:boolean)=>void; // optional: callback on visibility change for custom logic
  children?: React.ReactNode; // your React.lazy-ified component
}
```



