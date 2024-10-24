import { createGuestInsecure, getGuestsInsecure } from '../../database/guests';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { Guest, guestsSchema } from '../../migrations/00000-createTableGuests';

type GuestResponseBodyPost =
  | {
      guest: Guest;
    }
  | { error: string; errorIssues: { message: string }[] }
  | { error: string };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<GuestResponseBodyPost>> {
  const requestBody = await request.json();

  const result = guestsSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
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

  const guest = await createGuestInsecure(newGuest);

  if (!guest) {
    return ExpoApiResponse.json(
      { error: 'Guest not created' },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}

type GuestResponseBodyGet = {
  guests: Guest[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<GuestResponseBodyGet>> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);

  const guests = await getGuestsInsecure();

  return ExpoApiResponse.json(
    { guests: guests },
    {
      headers: {
        'Set-Cookie': 'test=123',
      },
    },
  );
}
