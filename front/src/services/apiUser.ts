import { type UserPayload, type UserLoginPayload } from '@/types/users'
import { post } from '@/helpers/http'

export async function createUser(params: UserPayload) {
  return post('http://localhost:3000/api/user/signup', params, {})
}

export async function logUser(params: UserLoginPayload) {
  return post('http://localhost:3000/api/user/login', params, {})
}
