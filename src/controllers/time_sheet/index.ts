import { Request, Response } from "express";
import { saveTimeSheetToExcel } from "@utils/time_sheet_service";

let timeSheets: TimeSheet[] = [];
let idCounter = 1;

interface TimeSheet {
    id: number;
    hours: number;
    date: number;
    title: string;
    jiraId: number;
    description?: string;
}

export const createTimeSheet = (req: Request, res: Response) => {
    const { hours, date, title, jiraId, description } = req.body;

    if (!hours || !date || !title || !jiraId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newSheet: TimeSheet = {
        id: idCounter++,
        hours,
        date,
        title,
        jiraId,
        description,
    };

    timeSheets.push(newSheet);

    try {
        saveTimeSheetToExcel(newSheet); 
    } catch (error) {
        console.error("Failed to write to Excel:", error);
        return res.status(500).json({ message: "Failed to write to Excel" });
    }

    res.status(201).json(newSheet);
};
