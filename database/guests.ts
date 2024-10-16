import { Guest } from '../migrations/00000-createTableGuests';
import { sql } from './connect';

// eslint-disable-next-line no-restricted-syntax
export const getGuests = async (
  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  insecureSessionToken: string,
) => {
  // FIXME: Remove this early return when proper session token validation is implemented (see FIXME in query below)
  if (
    insecureSessionToken !==
    'ae96c51f--fixme--insecure-hardcoded-session-token--5a3e491b4f'
  ) {
    return null;
  }

  const guests = await sql<Guest[]>`
    SELECT
      *
    FROM
      guests
  `;
  return guests;
};

// eslint-disable-next-line no-restricted-syntax
export const getGuest = async (
  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  insecureSessionToken: string,
  id: number,
) => {
  // FIXME: Remove this early return when proper session token validation is implemented (see FIXME in query below)
  if (
    insecureSessionToken !==
    'ae96c51f--fixme--insecure-hardcoded-session-token--5a3e491b4f'
  ) {
    return null;
  }

  const [guest] = await sql<Guest[]>`
    SELECT
      *
    FROM
      guests
    WHERE
      id = ${id}
  `;
  return guest;
};

// eslint-disable-next-line no-restricted-syntax
export const createGuest = async (
  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  insecureSessionToken: string,
  newGuest: Omit<Guest, 'id'>,
) => {
  // FIXME: Remove this early return when proper session token validation is implemented (see FIXME in query below)
  if (
    insecureSessionToken !==
    'ae96c51f--fixme--insecure-hardcoded-session-token--5a3e491b4f'
  ) {
    return null;
  }

  const [guest] = await sql<Guest[]>`
    INSERT INTO
      guests (
        first_name,
        last_name,
        attending
      )
    VALUES
      (
        ${newGuest.firstName},
        ${newGuest.lastName},
        ${newGuest.attending}
      )
    RETURNING
      guests.*
  `;
  return guest;
};

// eslint-disable-next-line no-restricted-syntax
export const deleteGuest = async (
  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  insecureSessionToken: string,
  id: number,
) => {
  // FIXME: Remove this early return when proper session token validation is implemented (see FIXME in query below)
  if (
    insecureSessionToken !==
    'ae96c51f--fixme--insecure-hardcoded-session-token--5a3e491b4f'
  ) {
    return null;
  }

  const [guest] = await sql<Guest[]>`
    DELETE FROM guests
    WHERE
      id = ${id}
    RETURNING
      guests.*
  `;
  return guest;
};
