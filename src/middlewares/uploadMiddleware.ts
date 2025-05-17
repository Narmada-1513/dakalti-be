import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { getEnv } from "../config/getEnv";
import express, { Request, Response } from "express";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
dotenv.config();

const env = getEnv();

if (
  !env.awsRegion ||
  !env.awsAccessKeyId ||
  !env.awsSecretAccessKey ||
  !env.s3Bucket
) {
  throw new Error("Missing AWS S3 environment variables");
}

const s3 = new S3Client({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  },
});

const allowedTypes: string[] = null;

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
