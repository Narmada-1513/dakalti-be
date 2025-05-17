// routes/timeSheetRoutes.ts
import express from "express";
import {
    getAllTimeSheets,
    getTimeSheetById,
    createTimeSheet,
    updateTimeSheet,
    deleteTimeSheet,
} from "../controllers/timeSheetController";

const router = express.Router();

router.get("/", getAllTimeSheets);
router.get("/:id", getTimeSheetById);
router.post("/", createTimeSheet);
router.put("/:id", updateTimeSheet);
router.delete("/:id", deleteTimeSheet);

export default router;
