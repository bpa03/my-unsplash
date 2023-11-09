import * as jose from 'jose'
import {readFile} from 'fs/promises'

type Payload = unknown

export default async function verifyJwt (jwt: string): Promise<Payload | undefined> {
  const alg = 'RS256'
  const buffer = await readFile('publickey.crt')
  const publicKey = buffer.toString()

  try {
    const key = await jose.importSPKI(publicKey, alg)
    const {payload} = await jose.jwtVerify(jwt, key)
    return payload
  } catch (error) {
    if (error instanceof jose.errors.JWSInvalid) { return undefined }
  }
}
