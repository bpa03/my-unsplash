import bcrypt from 'bcrypt'

export default async function encryptPassword (password: string): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) { reject(err); return }

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) { reject(err); return }
        resolve(hash)
      })
    })
  })
}
