export async function POST(): Promise<Response> {
  // FIXME: Delete session token from the database
  // 1. Get the session token from the cookie
  // 2. Delete the session token from the database
  // 3. Set the cookie with the token value to expire

  return Response.json(
    {
      success: true,
    },
    {
      headers: {
        'Set-Cookie': 'insecureSessionTokenCookie=; Max-Age=0; Path=/',
      },
    },
  );
}
