import './Page.css'

import { Outlet } from 'react-router-dom'
import { RenderTracker } from './RenderTracker'
import { auth } from './state/auth'
import { logout } from './state/auth'
import { useSnapshot } from 'valtio'

export const Page = () => {
  const authState = useSnapshot(auth)

  return (
    <div className="page">
      <RenderTracker />
      <header className="App-header">
        <p>
          {authState.user.firstName} {authState.user.lastName}
        </p>
      </header>
      <button onClick={logout}>Logout</button>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
