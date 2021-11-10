import { devtools, watch } from 'valtio/utils'

import { Auth } from './@types'
import { fork } from 'fluture'
import { post } from './future'
import { proxy } from 'valtio'

const initialDetails = { username: '', firstName: '', lastName: '', email: '' }

export const auth = proxy<Auth>({
  user: initialDetails,
  status: 'NONE',
  error: undefined,
})

const forkAuthResponse = fork((err: Error) => {
  console.error(err)
  auth.error = err.message
  auth.status = 'BAD'
  return err
})((res: Auth['user'] & { token: string }) => {
  const { token, ...user } = res
  sessionStorage['token'] = res?.token
  auth.user = user
  auth.status = 'OK'
  return res
})

export function refresh({ token }: { token: string }) {
  post<Auth['user'] & { token: string }>('/api/refresh', { token }).pipe(forkAuthResponse)
}

export function login(credentials: { username: string; password: string }) {
  post<Auth['user'] & { token: string }>('/api/refresh', credentials).pipe(forkAuthResponse)
}

export function logout() {
  delete window.sessionStorage['token']
  auth.user = { ...initialDetails }
  auth.status = 'NONE'
}

devtools(auth, 'auth')

const subscription = watch((get) => {
  console.log('auth changed', get(auth).user)
})
