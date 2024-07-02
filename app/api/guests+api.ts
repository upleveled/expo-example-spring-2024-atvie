import { addGuest, getGuests } from '../../database/guests';

export async function GET(request: Request): Promise<Response> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);
  const guests = await getGuests();

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
  const body = await request.json();

  if (!body.firstName || !body.lastName) {
    return Response.json(
      'Request body missing a firstName or lastName property',
      {
        status: 400,
      },
    );
  }

  if (Object.keys(body).length > 3) {
    return Response.json(
      'Request body contains more than firstName, lastName and deadline properties',
      {
        status: 400,
      },
    );
  }

  const newGuest = {
    firstName: body.firstName,
    lastName: body.lastName,
    attending: false,
  };

  const guest = await addGuest(newGuest);

  return Response.json(guest);
}
