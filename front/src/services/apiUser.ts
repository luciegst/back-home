import { type User, type UserPayload } from '@/types/users'
import { post } from '@/helpers/http'

export async function createUser(params: UserPayload): Promise<User> {
  return post<User>('http://localhost:3000/api/user/signup', params, {})
}
