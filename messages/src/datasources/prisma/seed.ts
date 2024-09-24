import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const captain = await prisma.user.create({
    data: {
      name: "Captain Dallas",
    }
  })
  const xenomorph = await prisma.user.create({
    data: {
      name: "Xeno",
      role: "host"
    }
  })
  const ripley = await prisma.user.create({
    data: {
      name: "Ellen Ripley",
    }
  })
  const kane = await prisma.user.create({
    data: {
      name: "Gilbert Kane",
    }
  })

  const confrontation = await prisma.conversation.create({
    data: {
      participants: {
        create: [
         {
           participant: {
             connect: {
               id: ripley.id
             }
           }
         },
         {
           participant: {
             connect: {
               id: xenomorph.id
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