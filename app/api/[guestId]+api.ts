import { deleteGuestInsecure, getGuestInsecure } from '../../database/guests';
import { guestsSchema } from '../../migrations/00000-createTableGuests';

export async function GET(
  request: Request,
  { guestId }: { guestId: string },
): Promise<Response> {
  const guest = await getGuestInsecure(Number(guestId));

  if (!guest) {
    return Response.json(
      { error: `No guest with id ${guestId} found` },
      { status: 404 },
    );
  }
  return Response.json({ guest: guest });
}

export async function DELETE(
  request: Request,
  { guestId }: { guestId: string },
): Promise<Response> {
  const guests = await deleteGuestInsecure(Number(guestId));

  return Response.json({ guests: guests });
}

// TODO: Implement Edit UI
export async function PUT(
  request: Request,
  { guestId }: { guestId: string },
): Promise<Response> {
  const requestBody = await request.json();

  const result = guestsSchema.safeParse(requestBody);

  if (!result.success) {
    return Response.json(
      {
        error: 'Request does not contain guest object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const guest = await getGuestInsecure(Number(guestId));

  if (!guest) {
    return Response.json(
      {
        errors: [
          {
            message: `Guest ${guestId} not found`,
          },
        ],
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({ guest: guest });
}
