import {
  deleteGuestById,
  getGuestById,
  getGuests,
  Guest,
} from '../database/guests';

export function GET(request: Request, { id }: { id: string }) {
  const guest = getGuestById(id);
  console.log(guest);
  if (!guest) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  return Response.json(guest);
}

export function DELETE(request: Request, { id }: { id: string }) {
  const guests = deleteGuestById(id);

  return Response.json(guests);
}

export async function PUT(request: Request, { id }: { id: string }) {
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

  const guest = getGuestById(id);

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
