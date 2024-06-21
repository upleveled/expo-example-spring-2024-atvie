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

console.log('guests in db', guests);

export type Guest = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean;
};

export function getGuests() {
  return guests;
}

export function getGuest(id: number) {
  return guests.find((guest: Guest) => Number(guest.id) === Number(id));
}

export function addGuest(guest: Guest) {
  guests.push(guest);
  return guests;
}

export function deleteGuest(id: number) {
  const index = guests.findIndex((guest) => guest.id === id);

  if (index === -1) {
    return;
  }
  guests.splice(index, 1);
  return guests;
}
