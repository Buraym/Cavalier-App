import { write } from 'xlsx';
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

export async function ExportDailyMovimentations(locale: any, data: any) {
  try {
    const selected = await save({
      title: locale['file-to'],
      filters,

    });
    if(!selected) throw new Error(locale['no-file-selected']);
    const { date, total, movimentations } = data;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      [
        {
          v: `${locale['title']} - ${date}`,
          t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            }, 
            font: {
              color: { rgb: "000000" },
            },
            fill: {
              fgColor: { rgb: "ebbf3c" },
              bgColor: { rgb: "ebbf3c" },
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
          }
        }
      ],
      [
        { 
          v: "ID", t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },            
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        {
          v: locale['driver'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            }, 
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        { 
          v: locale['vehicle'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        { 
          v: locale['enter-time'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        { 
          v: locale['exit-time'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
        { 
          v: locale['total'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
            font: {
              bold: true,
            },
            alignment: { vertical: "center", horizontal: "center" }
          }
        },
      ],
      ...movimentations,
      [
        { 
          v: locale['total-amount'], t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },  
            font: {
              bold: true,
            },
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },
          }
        },
        {
          v: "", t: "s",
          s: {
            border: {
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },
          }
        },
        {
          v: `R$ ${total}`, t: "s",
          s: {
            border: {
              left: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              right: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              top: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              },
              bottom: {
                style: "thick",
                color: { rgb: "0c0c0c" }
              }
            },
            alignment: { vertical: "center", horizontal: "center" },
            font: {
              bold: true,
            }
          }
        }
      ],
    ]);
    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 2 + Number(movimentations.length), c: 0 }, e: { r: 2 + Number(movimentations.length), c: 4 } }
    ];
    ws["!merges"] = merge;
    XLSX.utils.book_append_sheet(wb, ws, locale['title']);
    XLSX.writeFile(wb, `${locale['title']}_${new Date().valueOf()}.xlsx`);
    // const d = write(wb, {type: "buffer", bookType: selected.slice(selected.lastIndexOf(".") + 1) as any}) as Uint8Array;
    // await writeBinaryFile(selected, d);
    await message(locale['file-saved']);
  } catch(e) {
    await message((e as Error).message || (e as string), { title: locale['file-cannot-be-saved'], type: "error"});
  }
}