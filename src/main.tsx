import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import { refresh } from '@/state/auth'
import { worker } from '@/mocks/browser'

async function prepareServiceWorker() {
  if (import.meta.env.DEV) {
    // ...this is should usually not need to be loaded manually?
    await import('../public/mockServiceWorker.js?worker')

    await worker.start()

    /* -- anything that requires msw needs to run after this -- */

    const token = window.sessionStorage['token']

    // bootstrap the user on refresh if token in session storage
    // this is complete dummy auth implementation, do not use as model for handling tokens
    // however, it is sometimes better to fetch a user from storage outside module scope
    // on app startup instead of inside a React component, which would lead to re-renders
    if (token) {
      console.log('refresh', token)
      refresh({ token })
    }
  }
}

async function run() {
  await prepareServiceWorker()

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

run()
