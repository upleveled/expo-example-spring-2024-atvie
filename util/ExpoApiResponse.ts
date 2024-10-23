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
