import type { User } from '../migrations/00001-createTableUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserInsecure(username: User['username']) {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
}

export async function createUserInsecure(
  username: User['username'],
  passwordHash: UserWithPasswordHash['passwordHash'],
) {
  const [user] = await sql<User[]>`
    INSERT INTO
      users (username, password_hash)
    VALUES
      (
        ${username.toLowerCase()},
        ${passwordHash}
      )
    RETURNING
      users.id,
      users.username
  `;
  return user;
}

export async function getUserWithPasswordHashInsecure(
  username: User['username'],
) {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
}
