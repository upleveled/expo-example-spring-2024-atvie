import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request): Promise<Response> {
  const requestBody = await request.json();

  const result = loginSchema.safeParse(requestBody);

  if (!result.success) {
    return Response.json(
      {
        error: 'Invalid username or password',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // FIXME: Implement secure authentication
  if (result.data.username !== 'victor' || result.data.password !== 'asdf') {
    return Response.json(
      { error: 'Invalid username or password' },
      {
        status: 400,
      },
    );
  }

  // FIXME: Create a secure session token cookie:
  // 1. Generate a token
  // 2. Store the token in the database
  // 3. Set a cookie with the token value
  return Response.json(
    { success: true },
    {
      headers: {
        'Set-Cookie':
          'insecureSessionTokenCookie=ae96c51f--fixme--insecure-hardcoded-session-token--5a3e491b4f; Max-Age=3600; Path=/',
      },
    },
  );
}
