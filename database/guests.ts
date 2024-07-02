import { sql } from './connect';

declare module globalThis {
  let guestsDatabase: Guest[];
}

// Initialize database to empty array only once
//
// TODO: Add a full PostgreSQL database connection
if (!('guestsDatabase' in globalThis)) {
  globalThis.guestsDatabase = [];
}

const guests = globalThis.guestsDatabase;

export type Guest = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean;
};

export const getGuests = async () => {
  const guests = await sql<Guest[]>`
    SELECT
      *
    FROM
      guests
  `;
  return guests;
};

export const getGuest = async (id: number) => {
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

export const addGuest = async (newGuest: Omit<Guest, 'id'>) => {
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

export const deleteGuest = async (deleteGuest: Pick<Guest, 'id'>) => {
  const [guest] = await sql<Guest[]>`
      DELETE FROM guests
      WHERE
        id = ${deleteGuest.id}
      RETURNING
        guests.*
    `;
  return guest;
};
