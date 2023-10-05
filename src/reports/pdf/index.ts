import { jsPDF } from "jspdf";
import { DialogFilter, message, save } from '@tauri-apps/api/dialog';
// import { BaseDirectory, writeFile, writeTextFile } from '@tauri-apps/api/fs';
import { format } from "date-fns";

const filters: DialogFilter[] = [
    {name: "Portable Document File", extensions: ["pdf"]},
  ];

export async function ExportDailyMovimentationsPDF(locale: string, data: any) {
    try {
        const selected = await save({
            title: "Save to Spreadsheet",
            filters
        });
        if(!selected) throw new Error("No file selected");
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();
        doc.text("Teste mesmo", 10, 10);
        doc.html
        // doc.save(`PLANILHA DE MOVIMENTOS - ${format(new Date(), "dd/MM/yyyy - HH:mm:ss")}`);
        // @ts-ignore
        // await writeFile(selected, doc);
        doc.save(selected);
    } catch(e) {
        await message((e as Error).message || (e as string), { title: "Save Error", type: "error"});
    }
    
}