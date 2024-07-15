import { Guest } from '../migrations/00000-createTableGuests';
import { sql } from './connect';

export const getGuestsInsecure = async () => {
  const guests = await sql<Guest[]>`
    SELECT
      *
    FROM
      guests
  `;
  return guests;
};

export const getGuestInsecure = async (id: number) => {
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

export const addGuestInsecure = async (newGuest: Omit<Guest, 'id'>) => {
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

export const deleteGuestInsecure = async (id: number) => {
  const [guest] = await sql<Guest[]>`
    DELETE FROM guests
    WHERE
      id = ${id}
    RETURNING
      guests.*
  `;
  return guest;
};
