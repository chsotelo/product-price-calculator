class MongooseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "MongooseError";
    this.code = code;
  }
}

class MongooseErrorFactory {
  static createError(code, message) {
    return new MongooseError(message, code);
  }

  static handleMongooseError(error) {
    let message = "An error occurred while performing Mongoose operation.";
    let code = "unknown";

    if (error.code) {
      code = error.code;
    }

    if (error.message) {
      message = error.message;
    }

    throw MongooseErrorFactory.createError(code, message);
  }
}

export { MongooseErrorFactory, MongooseError };
