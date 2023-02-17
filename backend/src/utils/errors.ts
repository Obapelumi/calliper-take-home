export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export class NotFoundError extends HttpError {
  constructor(public message: string) {
    super(404, message);
  }
}
export class BadRequestError extends HttpError {
  constructor(public message: string) {
    super(400, message);
  }
}

export class ValidationError extends HttpError {
  constructor(public message: string) {
    super(422, message);
  }
}
export class InternalError extends HttpError {
  constructor(public message: string) {
    super(500, message);
  }
}
