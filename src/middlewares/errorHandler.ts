import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

// Define the middleware function
function errorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    res.status(500).json({
      status: "Error",
      statusCode: 500,
      message: "Something went very wrong!",
    });
  }
}

export { errorHandlerMiddleware };
