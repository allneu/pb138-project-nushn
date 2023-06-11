import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     userName: 'Jakub',
  //     email: 'aa@bobis.com',
  //     hashedPassword: 'dasd',
  //     salt: 'dasd',
  //     editedAt: 's',
  //     avatar: 's',
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
