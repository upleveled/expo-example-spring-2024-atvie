import { deleteGuest, getGuest } from '../../database/guests';
import { guestsSchema } from '../../migrations/00000-createTableGuests';

export async function GET(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return Response.json({ error: 'No session found' }, { status: 400 });
  }

  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  const insecureSessionTokenCookie = cookie
    .split('; ')
    .find((row) => row.startsWith('insecureSessionTokenCookie='))
    ?.split('=')[1];

  if (!insecureSessionTokenCookie) {
    return Response.json({ error: 'Invalid session' }, { status: 400 });
  }

  const guest = await getGuest(insecureSessionTokenCookie, Number(id));

  if (!guest) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  return Response.json({ guest: guest });
}

export async function DELETE(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return Response.json({ error: 'No session found' }, { status: 400 });
  }

  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  const insecureSessionTokenCookie = cookie
    .split('; ')
    .find((row) => row.startsWith('insecureSessionTokenCookie='))
    ?.split('=')[1];

  if (!insecureSessionTokenCookie) {
    return Response.json({ error: 'Invalid session' }, { status: 400 });
  }

  const guests = await deleteGuest(insecureSessionTokenCookie, Number(id));

  return Response.json({ guests: guests });
}

// TODO: Implement Edit UI
export async function PUT(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const requestBody = await request.json();

  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return Response.json({ error: 'No session found' }, { status: 400 });
  }

  // FIXME: Rename insecureSessionToken to sessionToken everywhere
  const insecureSessionTokenCookie = cookie
    .split('; ')
    .find((row) => row.startsWith('insecureSessionTokenCookie='))
    ?.split('=')[1];

  if (!insecureSessionTokenCookie) {
    return Response.json({ error: 'Invalid session' }, { status: 400 });
  }

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

  const guest = await getGuest(insecureSessionTokenCookie, Number(id));

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

  return Response.json({ guest: guest });
}
