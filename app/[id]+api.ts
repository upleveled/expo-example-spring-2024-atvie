import { Guest, guests } from '../database/guests';

export const guestList: Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    attending: true,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    attending: false,
  },
];

export function GET(request: Request, { id }: { id: string }) {
  const guest = guestList.find((g) => g.id === id);
  console.log(guest);
  return Response.json(guest);
}

export function DELETE(request: Request, { id }: { id: string }) {
  const index = guests.findIndex((g) => g.id === id);
  if (index === -1) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  guests.splice(index, 1);
  return Response.json(guests);
}

export async function POST(request: Request, { id }: { id: string }) {
  const body = await request.json();
  const allowedKeys: Record<keyof Guest, boolean> = {
    id: false,
    firstName: true,
    lastName: true,
    attending: true,
  };
  const difference = Object.keys(body).filter(
    (key) => !allowedKeys[key as keyof Guest],
  );

  if (difference.length > 0) {
    return Response.json(
      {
        errors: [
          {
            message: `Request body contains more than allowed properties (${Object.keys(
              allowedKeys,
            ).join(
              ', ',
            )}). The request also contains these extra keys that are not allowed: ${difference.join(
              ', ',
            )}`,
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  const guest = guests.find((currentGuest) => currentGuest.id === id);

  if (!guest) {
    return Response.json(
      {
        errors: [
          {
            message: `Guest ${id} not found`,
          },
        ],
      },
      {
        status: 404,
      },
    );
  }

  if (body.firstName) guest.firstName = body.firstName as string;
  if (body.lastName) guest.lastName = body.lastName as string;
  if ('attending' in body) guest.attending = body.attending as boolean;

  return Response.json(guest);
}
