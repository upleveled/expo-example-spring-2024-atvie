import { deleteGuestInsecure, getGuestInsecure } from '../../database/guests';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { Guest, guestsSchema } from '../../migrations/00000-createTableGuests';

type GuestResponseBodyGet =
  | {
      guest: Guest;
    }
  | { error: string };

export async function GET(
  request: Request,
  { guestId }: { guestId: string },
): Promise<ExpoApiResponse<GuestResponseBodyGet>> {
  const guest = await getGuestInsecure(Number(guestId));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `No guest with id ${guestId} found` },
      { status: 404 },
    );
  }
  return ExpoApiResponse.json({ guest: guest });
}

type GuestResponseBodyPut =
  | {
      guest: Guest;
    }
  | { error: string; errorIssues: { message: string }[] }
  | { error: string };

export async function PUT(
  request: Request,
  { guestId }: { guestId: string },
): Promise<ExpoApiResponse<GuestResponseBodyPut>> {
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

  const guest = await getGuestInsecure(Number(guestId));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `Guest ${guestId} not found` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}

type GuestResponseBodyDelete =
  | {
      guest: Guest;
    }
  | { error: string };

export async function DELETE(
  request: Request,
  { guestId }: { guestId: string },
): Promise<ExpoApiResponse<GuestResponseBodyDelete>> {
  const guest = await deleteGuestInsecure(Number(guestId));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `Guest ${guestId} not found` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}
