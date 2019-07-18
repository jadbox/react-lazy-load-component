import React, { useEffect, useState } from 'react'
import useIsInViewport from 'use-is-in-viewport'

type FallbackType =
  | string
  | number
  | boolean
  | {}
  | React.ReactElement<
      any,
      | string
      | ((
          props: any
        ) => React.ReactElement<
          any,
          string | any | (new (props: any) => React.Component<any, any, any>)
        > | null)
      | (new (props: any) => React.Component<any, any, any>)
    >
  | React.ReactNodeArray
  | React.ReactPortal
  | null

interface IProps {
  width?: number;
  height?: number;
  fallback?: FallbackType;
  children?: React.ReactNode;
  threshold?: number;
  onVisibleChange?: (visible:boolean)=>void;
}

export default function WaypointLazy(props: IProps) {
  const { width, height, fallback, threshold } = Object.assign(
    { width: 400, height: 300, fallback: null, threshold: 0.1 },
    props
  )

  const [state, setState] = useState<any>({last:null, seen:false, play:false})
  const [isInViewport, childRef] = useIsInViewport({ threshold })

  useEffect(() => {
    if(props.onVisibleChange) { // && isInViewport !== state.last) { // hook only triggers on isInViewport
      // Make sure we don't fire 'no visibility' when the element has not been seen yet
      const isNotVisibleAndNotSeenYet = !isInViewport && !state.seen;

      if(!isNotVisibleAndNotSeenYet) {
        props.onVisibleChange(isInViewport ? true : false);
        // setState((p: any) => ({ ...p, last: isInViewport }));
      }
    }

    if (isInViewport && !state.seen) {
      setState((p: any) => ({ ...p, play: true, seen: true }));
    } else if (!isInViewport && state.seen) {
      setState((p: any) => ({ ...p, play: false }));
    }
  }, [isInViewport])

  // const Lazy = React.useMemo( () => React.lazy(f), [f] );

  return (
    <React.Suspense fallback={fallback}>
      <div ref={childRef}>
        {state.seen ? <>{props.children}</> : <div style={{ width, height }} />}
      </div>
    </React.Suspense>
  )
}

/*
export default function WaypointLazySuspend(props: Props) {
  const {width, height, fallback} = Object.assign({width:400, height:300, fallback:null}, props);
  return (<React.Suspense fallback={ null }> <WaypointLazy { ...props } /> </React.Suspense>);
}
*/
