declare module globalThis {
  let guestsDatabase: Guest[];
}

// Declare a global variable to store the guests data for access from any file
// in the project using globalThis. This maintains the state of the guests array
// throughout the application runtime.
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
  const index = guests.findIndex((guest: Guest) => guest.id === id);
  if (index === -1) {
    return;
  }
  guests.splice(index, 1);
  return guests;
}
