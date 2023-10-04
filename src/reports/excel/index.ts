import { read, write } from 'xlsx';
import XLSX from 'xlsx-js-style';
import { DialogFilter, message, save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';
const filters: DialogFilter[] = [
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  {name: "Excel 2003 XML Spreadsheet", extensions: ["xml"]},
  {name: "Symbolic Link", extensions: ["slk"]},
  {name: "Flat OpenDocument Spreadsheet", extensions: ["fods"]},
  {name: "OpenDocument Spreadsheet", extensions: ["fods"]}
];
const locales = {
  "pt": {

  },
  "es": {

  },
  "en": {

  },
};

export async function ExportDailyMovimentations(locale: String, data: any) {
  try {
    const selected = await save({
      title: "Save to Spreadsheet",
      filters
    });
    if(!selected) throw new Error("No file selected");
    const { date, movimentations } = data;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([[
      [`PLANILHA DE MOVIMENTOS - ${date}`, "", "", "", "", ""],
      ["ID", "CONDUTOR", "VEICULOS", "ENTRADA", "SAÍDA", "VALOR TOTAL"],
      ...movimentations,
      ["MONTANTE FINAL", "", "", "", "", "R$ 46.50"],
    ]]);
    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 2 + Number(movimentations.length), c: 0 }, e: { r: 2 + Number(movimentations.length), c: 4 } }
    ];
    ws["A1"].s = {
      font: {
        sz: 24,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1  } },
      }
    };
    ws["A2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["B2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["C2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["D2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["E2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["F2"].s = { 
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      },
      border: {
        top: { style: "thick", color: { auto: 1 } },
        bottom: { style: "thick", color: { auto: 1 } },
        left: { style: "thick", color: { auto: 1 } },
        right: { style: "thick", color: { auto: 1 } },
      }
    };
    ws["!merges"] = merge;
    XLSX.utils.book_append_sheet(wb, ws, "PLANILHA DE MOVIMENTOS");
    const d = write(wb, {type: "buffer", bookType: selected.slice(selected.lastIndexOf(".") + 1) as any}) as Uint8Array;
    await writeBinaryFile(selected, d);
    console.log(ws);
    await message(`File saved to ${selected}`);
  } catch(e) {
    await message((e as Error).message || (e as string), { title: "Save Error", type: "error"});
  }
}