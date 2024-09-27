const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const captain = await prisma.user.create({
    data: {
      name: "Captain Dallas",
      description: "Not up to much, just going the wrong direction mostly",
      username: "dallas",
    },
  });
  const xenomorph = await prisma.user.create({
    data: {
      name: "Xeno",
      role: "Host",
      description: "Ready to meet people and welcome them to my home <3",
      username: "xeno",
    },
  });
  const ripley = await prisma.user.create({
    data: {
      name: "Ellen Ripley",
      description: "Pretty awesome final girl",
      username: "ripley",
    },
  });
  const kane = await prisma.user.create({
    data: {
      name: "Gilbert Kane",
      description: "Spoiler alert - I'm the first to go!",
      username: "kane",
    },
  });

  console.log({ captain, xenomorph, ripley, kane });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
