import bcrypt from 'bcrypt'

export default async function compareEncryptedPassword (password: string, encryptedPassword: string): Promise<boolean> {
  return await new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, same) => {
      if (err) { reject(err); return }
      resolve(same)
    })
  })
}
