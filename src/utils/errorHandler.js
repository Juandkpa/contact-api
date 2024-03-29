class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class ValidationError extends BadRequestError {
  constructor(validationErrors, message) {
    super(message);
    this.validationErrors = validationErrors;
  }
}

class MediaTypeError extends CustomError {
  constructor(validationErrors, message = 'Unsupported Media Type') {
    super(415, message);
    this.validationErrors = validationErrors;
  }
}

const catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export { catchErrors, NotFoundError, BadRequestError, ValidationError, MediaTypeError };
