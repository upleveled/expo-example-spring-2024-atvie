import {
  deleteGuestInsecure,
  getGuestInsecure,
  updateGuestInsecure,
} from '../database/guests';
import { guestsSchema } from '../migrations/00000-createTableGuests';

export async function GET(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const guest = await getGuestInsecure(Number(id));

  if (!guest) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }
  return Response.json({ guest: guest });
}

export async function DELETE(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const guests = await deleteGuestInsecure(Number(id));

  return Response.json({ guests: guests });
}

export async function PUT(
  request: Request,
  { id }: { id: string },
): Promise<Response> {
  const requestBody = await request.json();

  const result = guestsSchema.safeParse(requestBody);

  if (!result.success) {
    return Response.json(
      {
        error: 'Request does not contain guest object',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  const updatedGuest = await updateGuestInsecure({
    id: Number(id),
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    attending: result.data.attending,
  });

  if (!updatedGuest) {
    return Response.json(
      { error: `No guest with id ${id} found` },
      { status: 404 },
    );
  }

  return Response.json(updatedGuest);
}
