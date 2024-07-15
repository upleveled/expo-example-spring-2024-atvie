import { addGuestInsecure, getGuestsInsecure } from '../../database/guests';
import { guestsSchema } from '../../migrations/00000-createTableGuests';

export async function GET(request: Request): Promise<Response> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);
  const guests = await getGuestsInsecure();

  return Response.json(
    { guests: guests },
    {
      headers: {
        'Set-Cookie': 'test=123',
      },
    },
  );
}

export async function POST(request: Request): Promise<Response> {
  const requestBody = await request.json();

  const result = guestsSchema.safeParse(requestBody);

  console.log(result);

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

  const guest = await addGuestInsecure(newGuest);

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
