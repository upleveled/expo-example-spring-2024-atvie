import type { Session } from '../migrations/00002-createTableSessions';
import type { Note } from '../migrations/00003-createTableNotes';
import { sql } from './connect';

export async function getNotes(sessionToken: Session['token']) {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = notes.user_id
        AND expiry_timestamp > now()
      )
  `;
  return notes;
}
export async function getNote(
  sessionToken: Session['token'],
  noteId: Note['id'],
) {
  const [note] = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = notes.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      notes.id = ${noteId}
  `;
  return note;
}

export async function createNote(
  sessionToken: Session['token'],
  title: Note['title'],
  textContent: Note['textContent'],
) {
  const [note] = await sql<Note[]>`
    INSERT INTO
      notes (user_id, title, text_content) (
        SELECT
          user_id,
          ${title},
          ${textContent}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
      )
    RETURNING
      notes.*
  `;

  return note;
}
