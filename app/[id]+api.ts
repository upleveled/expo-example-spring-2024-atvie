import { deleteGuestInsecure, getGuestInsecure } from '../database/guests';
import { Guest, guestsSchema } from '../migrations/00000-createTableGuests';
import { ExpoApiResponse } from '../util/ExpoApiResponse';

type ExpoResponseBodyGet =
  | {
      guest: Guest;
    }
  | { error: string };

export async function GET(
  request: Request,
  { id }: { id: string },
): Promise<ExpoApiResponse<ExpoResponseBodyGet>> {
  const guest = await getGuestInsecure(Number(id));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  return ExpoApiResponse.json({ guest: guest });
}

type ExpoResponseBodyDelete =
  | {
      guest: Guest;
    }
  | { error: string };

export async function DELETE(
  request: Request,
  { id }: { id: string },
): Promise<ExpoApiResponse<ExpoResponseBodyDelete>> {
  const guest = await deleteGuestInsecure(Number(id));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `Guest ${id} not found` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}

type ExpoResponseBodyPut =
  | {
      guest: Guest;
    }
  | { error: string; errorIssues: { message: string }[] }
  | { error: string };

// TODO: Implement Edit UI
export async function PUT(
  request: Request,
  { id }: { id: string },
): Promise<ExpoApiResponse<ExpoResponseBodyPut>> {
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

  const guest = await getGuestInsecure(Number(id));

  if (!guest) {
    return ExpoApiResponse.json(
      { error: `Guest ${id} not found` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ guest: guest });
}
