import * as jose from 'jose'
import {readFile} from 'fs/promises'

export default async function generateJwt (payload: jose.JWTPayload): Promise<string> {
  const alg = 'RS256'
  const buffer = await readFile('pkcs8.key')
  const pkcs8 = buffer.toString()

  const privateKey = await jose.importPKCS8(pkcs8, alg)
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({alg})
    .setExpirationTime('24h')
    .sign(privateKey)
  return jwt
}
