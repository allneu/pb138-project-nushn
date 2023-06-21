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

const labelCreateQueries = data.labels.map(
  ({ ...label }) => prisma.label.create({
    data: { ...label },
  }),
);

const subPageCreateQueries = data.subpages.map(
  ({ ...subpage }) => prisma.subPage.create({
    data: { ...subpage },
  }),
);

const taskCreateQueries = data.tasks.map(
  ({ ...task }) => prisma.task.create({
    data: { ...task },
  }),
);
// create post queries with nested writes (thanks to the Prisma's awesome API)

const seed = async () => {
  console.log(`[${new Date(Date.now()).toISOString()}]: Seeding started`);
  try {
    await prisma.$transaction([
      ...userCreateQueries,
      ...subPageCreateQueries,
      ...labelCreateQueries,
      ...taskCreateQueries,
    ]);

    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding succesful!`);
  } catch (e) {
    console.log(e);
    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding was not successful. Aborting!`);
  }
};

seed();
