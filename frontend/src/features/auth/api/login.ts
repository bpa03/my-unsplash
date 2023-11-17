import {LoginCredentials, User} from '../types'

export default async function login(body: LoginCredentials): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    method: 'POST'
  })

  if (!response.ok) {
    const {error} = await response.json()
    throw new Error(error.message)
  }

  const user = await response.json()
  return user
}