import { AppError } from "../utils/AppError";
import { getEnv } from "../config/getEnv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  email: string;
  id: string;
}

// Define the type augmentation for the Request object
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Middleware to check user access
export const checkUserAccess = () => {
  const { jwtSecret } = getEnv();
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // Use return here to prevent further execution
        return next(new AppError("No token provided", 401));
      }
      const token = authHeader.split(" ")[1];

      // Verify the token and extract the payload
      const decoded = jwt.verify(token, jwtSecret) as UserPayload

      // Add the user payload to the request object
      req.user = decoded;

      // User has access, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Use return here to prevent calling next() after sending a response
      return next(new AppError("Invalid token", 401));
    }
  };
};
