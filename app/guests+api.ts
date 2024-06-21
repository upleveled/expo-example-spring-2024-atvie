import { addGuest, getGuests, Guest } from '../database/guests';

let id = 1;

export function GET(request: Request): Response {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);
  const guests = getGuests();
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
  const guests = getGuests();

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

  console.log('first name', body.firstName);
  console.log('last name', body.lastName);

  const guest: Guest = {
    id: String(id++),
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    attending: false,
  };

  console.log('before push', guests);

  const newGuest = addGuest(guest);

  return Response.json(newGuest);
}
