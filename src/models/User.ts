import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserSchema } from "./interface/models.interface";
import { getEnv } from "../config/getEnv";

const { jwtSecret, jwtExpiry } = getEnv();

const UserSchema = new Schema<IUserSchema>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    password: { type: String, required: function() { return !this.googleId; }},
    resetPasswordOtp: { type: String },
    resetPasswordOtpExpiry: { type: Date},
    isActive: { type: Boolean, default: false },
    termsAndCondition: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false }, 
    verificationOtpExpiry: { type: Date },
    verificationOtp: { type: String },
    stripeCustomerId:{ type: String},
    isSubscribed: { type: Boolean, default: false }    ,
    profileId: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.validatePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUserSchema>("User", UserSchema);
