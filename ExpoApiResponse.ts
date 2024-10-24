// Copy future implementation of Expo API Routes response type, proposed here:
// https://github.com/expo/expo/issues/30521
//
// TODO: Switch from this to official Expo API response type when available
const internals = Symbol('internal response');

export class ExpoApiResponse<Body = unknown> extends Response {
  [internals]: {
    Body?: Body;
  };

  constructor(body?: BodyInit | null, init: ResponseInit = {}) {
    super(body, init);

    this[internals] = {};
  }

  static json<JsonBody>(
    body: JsonBody,
    init?: ResponseInit,
  ): ExpoApiResponse<JsonBody> {
    const response: Response = Response.json(body, init);
    return new ExpoApiResponse(response.body, response);
  }
}
