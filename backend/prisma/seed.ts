import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  const baldassare = await prisma.user.create({
    data: {
      email: 'baldassare@gmail.com',
      password: '12345678',
      name: 'Baldassare',
      lastname: 'Pugliese Alvarez',
      gender: 'MALE',
      Image: {
        create: [
          {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'super image label'
          },
          {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'super image label'
          },
          {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'super image label'
          },
          {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'super image label'
          }
        ]
      }
    }
  })

  // Images
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
