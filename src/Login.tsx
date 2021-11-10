import * as React from 'react'

import { auth, login } from '@/state/auth'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { atom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

const loginFormValuesAtom = atom({ username: '', password: '' })
const setFormValuesAtom = atom(null, (get, set, { field, value }) => {
  const values = get(loginFormValuesAtom)
  set(loginFormValuesAtom, { ...values, [field]: value })
})
const validFormAtom = atom((get) => {
  const { username, password } = get(loginFormValuesAtom)
  return username.length > 0 && password.length > 6
})

export function Login() {
  const { username, password } = useAtomValue(loginFormValuesAtom)
  const valid = useAtomValue(validFormAtom)
  const update = useUpdateAtom(setFormValuesAtom)
  const authState = useSnapshot(auth)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (authState.status === 'OK') {
      navigate('/')
    }
  }, [authState.status])

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login({ username, password })
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => update({ field: 'username', value: e.currentTarget.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => update({ field: 'password', value: e.currentTarget.value })}
          />
        </label>
        <input type="submit" value="Login" disabled={!valid} />
      </form>
    </div>
  )
}
