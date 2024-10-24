import type { User } from '../migrations/00001-createTableUsers';
import type { Session } from '../migrations/00002-createTableSessions';
import { sql } from './connect';

export async function createSessionInsecure(
  token: Session['token'],
  userId: User['id'],
) {
  const [session] = await sql<Session[]>`
    INSERT INTO
      sessions (token, user_id)
    VALUES
      (
        ${token},
        ${userId}
      )
    RETURNING
      sessions.id,
      sessions.token,
      sessions.user_id
  `;

  await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now()
  `;

  return session;
}
