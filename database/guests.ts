import type { Guest } from '../migrations/00000-createTableGuests';
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

export const getGuestInsecure = async (guestId: Guest['id']) => {
  const [guest] = await sql<Guest[]>`
    SELECT
      *
    FROM
      guests
    WHERE
      id = ${guestId}
  `;
  return guest;
};

export const createGuestInsecure = async (newGuest: Omit<Guest, 'id'>) => {
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

export const updateGuestInsecure = async (updatedGuest: Guest) => {
  const [guest] = await sql<Guest[]>`
    UPDATE guests
    SET
      first_name = ${updatedGuest.firstName},
      last_name = ${updatedGuest.lastName},
      attending = ${updatedGuest.attending}
    WHERE
      id = ${updatedGuest.id}
    RETURNING
      guests.*
  `;
  return guest;
};

export const deleteGuestInsecure = async (guestId: Guest['id']) => {
  const [guest] = await sql<Guest[]>`
    DELETE FROM guests
    WHERE
      id = ${guestId}
    RETURNING
      guests.*
  `;
  return guest;
};
