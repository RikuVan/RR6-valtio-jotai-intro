export type UserStatus = 'NONE' | 'PENDING' | 'OK' | 'BAD'

export type UserDetails = {
  username: string
  firstName: string
  lastName: string
  email: string
}

export type Auth = {
  user: UserDetails
  status: UserStatus
  error?: any
}
