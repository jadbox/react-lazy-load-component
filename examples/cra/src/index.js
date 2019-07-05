import React from 'react'
import ReactDOM from 'react-dom'
import { button, nav } from './styles'

function App() {

  return (
    <>
    WIP!
    </>
  )
}

async function run() {
  if (!window.IntersectionObserver) {
    await import('intersection-observer')
  }

  const rootElement = document.getElementById('root')
  ReactDOM.render(<App />, rootElement)
}

run()