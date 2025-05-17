class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  success: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = false
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOperational = isOperational;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      statusCode: this.statusCode,
      message: this.message
    };
  }
}

export { AppError };