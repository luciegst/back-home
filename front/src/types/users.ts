export type User = {
  id: Number
  first_name?: string
  last_name?: string
  email: string
  password: string
}

export type UserPayload = {
  first_name?: string
  last_name?: string
  email: string
  password: string
}

export type UserLoginPayload = {
  email: string
  password: string
}
