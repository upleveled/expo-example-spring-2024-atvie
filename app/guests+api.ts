import { createGuestInsecure, getGuestsInsecure } from '../database/guests';
import { ExpoApiResponse } from '../ExpoApiResponse';
import { Guest, guestsSchema } from '../migrations/00000-createTableGuests';

type ExpoResponseBodyGet = {
  guests: Guest[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ExpoResponseBodyGet>> {
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

type ExpoResponseBodyPost =
  | {
      guest: Guest;
    }
  | { error: string; errorIssues: { message: string }[] }
  | { error: string };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<ExpoResponseBodyPost>> {
  const requestBody = await request.json();

  const newGuest = {
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    attending: false,
  };

  const result = guestsSchema.safeParse(newGuest);

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
