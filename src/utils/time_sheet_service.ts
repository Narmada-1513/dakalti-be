// services/timeSheetService.ts
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

interface TimeSheet {
    id: number;
    hours: number;
    date: number;
    title: string;
    JiraId: number;
    Description?: string;
}

const EXCEL_FILE_PATH = path.resolve(__dirname, "../data/timeSheets.xlsx");

export function saveTimeSheetToExcel(timeSheet: TimeSheet): void {
    let workbook: XLSX.WorkBook;
    let sheetData: any[] = [];

    // Read existing workbook if available
    if (fs.existsSync(EXCEL_FILE_PATH)) {
        workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const ws = workbook.Sheets["TimeSheets"];
        sheetData = XLSX.utils.sheet_to_json(ws);
    } else {
        workbook = XLSX.utils.book_new();
    }

    // Add new row to data
    sheetData.push({
        ID: timeSheet.id,
        Hours: timeSheet.hours,
        Date: new Date(timeSheet.date).toISOString(),
        Title: timeSheet.title,
        JiraID: timeSheet.JiraId,
        Description: timeSheet.Description || "",
    });

    // Convert JSON to worksheet
    const newSheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, newSheet, "TimeSheets", true); // true replaces sheet if exists

    // Write workbook to file
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}
