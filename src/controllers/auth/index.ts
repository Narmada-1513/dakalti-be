import { User } from "../../models/User";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../../utils/AppError";
import { validateRequestBody } from "../../utils/utilityFunctions";
import { sendEmail } from "../../utils/emailService";
import {
  IAuthLoginDto,
  IAuthLoginResponse,
} from "./auth.dto";
import { getEnv } from "../../config/getEnv";
import { IResponse } from "@common/interface";

export const loginUser = async (
  req: Request<{}, {}, IAuthLoginDto>,
  res: Response<IResponse<IAuthLoginResponse>>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    validateRequestBody(req, ["email", "password"]);

    const user = await User.findOne({ email });

    if (!user || !(await user.validatePassword(password))) {
      throw new AppError("Invalid email or password.", 401);
    }

    if (!user.isActive) {
      throw new AppError("Please verify your email to login.", 403);
    }

    const token = user.getJwtToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: token,
        isProfileCompleted: user.isProfileCompleted,
      },
    });
  } catch (error) {
    return next(
      error instanceof AppError 
        ? error 
        : new AppError(error.message, 500)
    );
  }
};
