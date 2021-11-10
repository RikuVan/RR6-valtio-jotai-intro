import './RenderTracker.css'

import * as React from 'react'

export const RenderTracker = () => {
  const countRef = React.useRef(0)
  countRef.current += 1
  return <div className="render-tracker">Render Count: {countRef.current}</div>
}
