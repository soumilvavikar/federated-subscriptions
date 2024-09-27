import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const captain = await prisma.user.create({
    data: {
      name: "Captain Dallas",
      username: "dallas"
    }
  })
  const xenomorph = await prisma.user.create({
    data: {
      name: "Xeno",
      role: "host",
      username: "xeno"
    }
  })
  const ripley = await prisma.user.create({
    data: {
      name: "Ellen Ripley",
      username: "ripley"
    }
  })
  const kane = await prisma.user.create({
    data: {
      name: "Gilbert Kane",
      username: "kane"
    }
  })

  const confrontation = await prisma.conversation.create({
    data: {
      id: "xeno-ripley-chat",
      participants: {
        create: [
         {
           participant: {
             connect: {
               username: ripley.username
             }
           }
         },
         {
           participant: {
             connect: {
               username: xenomorph.username
             }
           }
         }
        ]
       }
    }
  })

  console.log({ captain, xenomorph, ripley, kane, confrontation })
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