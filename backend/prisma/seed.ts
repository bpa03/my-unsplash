import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  const baldassare = await prisma.user.create({
    data: {
      email: 'baldassarepugliese@gmail.com',
      password: '12345678',
      name: 'Baldassare',
      lastname: 'Pugliese Alvarez',
      gender: 'MALE',
      Image: {
        create: {
          imageUrl: 'http.some.url.com'
        }
      }
    }
  })
  console.log({baldassare})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
