import { Request } from "express";
import { Model } from "mongoose";
import { AppError } from "./AppError";
import crypto from "crypto";
import { sendEmail } from "./emailService";
import { IProfileSchema } from "../models/interface/models.interface";

export const validateRequestBody = <T>(
  req: Request,
  fields: string[]
): void | Error => {
  const missingFields = fields.filter((field) => !req.body[field]);

  if (missingFields.length) {
    console.log(missingFields);
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
};

export function getRequiredFields<T>(model: Model<T>): string[] {
  return Object.entries(model.schema.paths)
    .filter(([_, schemaType]) => schemaType.isRequired)
    .map(([fieldName, _]) => fieldName);
}