// routes/timeSheetRoutes.ts
import express, { RequestHandler } from "express";
import {
    createTimeSheet,
} from "../../controllers/time_sheet";

const router = express.Router();

router.post("/createTimeSheet", createTimeSheet as unknown as RequestHandler);

export default router;
