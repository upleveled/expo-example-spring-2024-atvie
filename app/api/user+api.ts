export async function GET(request: Request): Promise<Response> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return Response.json({ error: 'No session found' }, { status: 400 });
  }

  // FIXME: Implement secure session token validation
  if (
    !cookie.includes(
      'insecureSessionTokenCookie=ae96c51f--fixme--insecure-hardcoded',
    )
  ) {
    return Response.json({ error: 'Invalid session' }, { status: 400 });
  }

  return Response.json({ success: true });
}
