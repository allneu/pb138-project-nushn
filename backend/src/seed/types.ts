/* IMPORTANT: Do NOT modify this file */

/* These are the types of the data from the JSON document */
export type UserJson = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  editedAt?: string;
  deletedAt?: string;
  hashedPassword: string;
  salt: string;
  avatar: string;
};
