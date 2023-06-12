/* IMPORTANT: Do NOT modify this file */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import data from './data/user_data.json';
import type { UserJson } from './types';

const prisma = new PrismaClient();
// Create user queries
const userCreateQueries = data.users.map(
  ({ ...user }: UserJson) => prisma.user.create({
    data: {
      ...user,
    },
  }),
);

// create post queries with nested writes (thanks to the Prisma's awesome API)

const seed = async () => {
  console.log(`[${new Date(Date.now()).toISOString()}]: Seeding started`);
  try {
    await prisma.$transaction([
      ...userCreateQueries,
    ]);

    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding succesful!`);
  } catch (e) {
    console.log(e);
    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding was not successful. Aborting!`);
  }
};

seed();
