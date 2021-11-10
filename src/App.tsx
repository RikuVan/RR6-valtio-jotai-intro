import {
  Link,
  Outlet,
  RouteObject,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
} from 'react-router-dom'

import { Login } from '@/Login'
import { Page } from '@/Page'
import { auth } from '@/state/auth'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Page />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: '/inner',
        element: (
          <h3>
            At path <code>/inner</code>
            <Outlet />
          </h3>
        ),
        children: [{ path: '/inner/:id', element: <RouteWithParams /> }],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]

function App() {
  const element = useRoutes(routes)
  const authState = useSnapshot(auth)
  const status = authState.status
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'NONE' || status === 'BAD') {
      navigate('/login')
    }
  }, [status, navigate])

  return <div className="App">{status === 'PENDING' ? <div>Loading...</div> : element}</div>
}

export default App

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

function IndexRoute() {
  const navigate = useNavigate()
  return (
    <>
      <h3>
        At path <code>/</code>
      </h3>
      <button onClick={() => navigate('/inner/2?value=1')}>
        Goto <code>inner/3?value=1</code>
      </button>
    </>
  )
}

function RouteWithParams() {
  const params = useParams()
  const [searchParams, setSearch] = useSearchParams()

  return (
    <div>
      <h3>
        You're at subpath <code>/inner/{params.id}</code>
      </h3>
      <h4>
        Search params: <pre>{JSON.stringify({ value: searchParams.get('value') }, null, 2)}</pre>
      </h4>
      <button
        onClick={() => setSearch({ value: `${parseInt(searchParams.get('value') || '0') + 1}` })}
      >
        Inc search params
      </button>
    </div>
  )
}
