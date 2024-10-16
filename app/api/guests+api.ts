import { createGuest, getGuests } from '../../database/guests';
import { guestsSchema } from '../../migrations/00000-createTableGuests';

export async function GET(request: Request): Promise<Response> {
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

  const guests = await getGuests(insecureSessionTokenCookie);

  return Response.json({ guests: guests });
}

export async function POST(request: Request): Promise<Response> {
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

  const newGuest = {
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    attending: false,
  };

  // FIXME: Implement secure session token cookie
  const guest = await createGuest(insecureSessionTokenCookie, newGuest);

  if (!guest) {
    return Response.json(
      { error: 'Guest not created' },
      {
        status: 500,
      },
    );
  }

  return Response.json({ guest: guest });
}
