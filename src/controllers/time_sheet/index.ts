import { saveTimeSheetToExcel } from "../services/timeSheetService";
// saveTimeSheetToExcel(newSheet);
export const createTimeSheet = async (req: Request, res: Response) => {
    const { hours, date, title, JiraId, Description } = req.body;

    if (!hours || !date || !title || !JiraId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newSheet: TimeSheet = {
        id: idCounter++,
        hours,
        date,
        title,
        JiraId,
        Description,
    };

    timeSheets.push(newSheet);

    try {
        await TimeSheetService.writeToExcel(newSheet);
    } catch (error) {
        console.error("Failed to write to Excel:", error);
        return res.status(500).json({ message: "Failed to write to Excel" });
    }

    res.status(201).json(newSheet);
};
