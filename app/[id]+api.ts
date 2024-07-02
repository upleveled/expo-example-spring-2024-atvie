import { deleteGuest, getGuest, Guest } from '../database/guests';

export async function GET(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const guest = await getGuest(Number(id));

  if (!guest) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  return Response.json(guest);
}

export async function DELETE(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const guests = await deleteGuest({
    id: Number(id),
  });

  return Response.json(guests);
}

// TODO: Implement Edit UI
export async function PUT(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
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

  const guest = await getGuest(Number(id));

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

  return Response.json(guest);
}
