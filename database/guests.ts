console.log('database guests');

declare global {
  let guestsDatabase: Guest[];
}

if (!globalThis.guestsDatabase) {
  globalThis.guestsDatabase = [];
  console.log('Initializing guests database');
}

const guests = globalThis.guestsDatabase;

console.log('guests in db', guests);

export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
};

export function getGuests() {
  return guests;
}

export function getGuestById(id: string) {
  return guests.find((guest) => guest.id === id);
}

export function addGuest(guest: Guest) {
  guests.push(guest);
  return guest;
}

export function deleteGuestById(id: string) {
  const index = guests.findIndex((guest) => guest.id === id);
  if (index === -1) {
    return;
  }
  guests.splice(index, 1);
  return guests;
}
