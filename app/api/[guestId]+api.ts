import {
  deleteGuestInsecure,
  getGuestInsecure,
  updateGuestInsecure,
} from '../../database/guests';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import {
  type Guest,
  guestsSchema,
} from '../../migrations/00000-createTableGuests';

export type GuestResponseBodyGet =
  | {
      guest: Guest;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { guestId }: { guestId: string },
): Promise<ExpoApiResponse<GuestResponseBodyGet>> {
  const guest = await getGuestInsecure(Number(guestId));

  if (!guest) {
    return ExpoApiResponse.json(
      {
        error: `No guest with id ${guestId} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ guest: guest });
}

export type GuestResponseBodyPut =
  | {
      guest: Guest;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

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

  const updatedGuest = await updateGuestInsecure({
    id: Number(guestId),
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    attending: result.data.attending,
  });

  if (!updatedGuest) {
    return ExpoApiResponse.json(
      {
        error: `Guest ${guestId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ guest: updatedGuest });
}

export type GuestResponseBodyDelete =
  | {
      guest: Guest;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { guestId }: { guestId: string },
): Promise<ExpoApiResponse<GuestResponseBodyDelete>> {
  const guest = await deleteGuestInsecure(Number(guestId));

  if (!guest) {
    return ExpoApiResponse.json(
      {
        error: `Guest ${guestId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}
