import { Guest, guests } from '../database/guests';

let id = 1;

export function GET(request: Request): Response {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);
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

  const guest: Guest = {
    id: String(id++),
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    ...(body.deadline ? { deadline: body.deadline as string } : {}),
    attending: false,
  };

  guests.push(guest);

  return Response.json(guest);
}
