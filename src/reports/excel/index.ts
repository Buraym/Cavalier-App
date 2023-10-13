import XLSX from 'xlsx-js-style';
import { DialogFilter, message, save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { create_report } from '@/controllers/reports';
const filters: DialogFilter[] = [
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  {name: "Excel 2003 XML Spreadsheet", extensions: ["xml"]},
  {name: "Symbolic Link", extensions: ["slk"]},
  {name: "Flat OpenDocument Spreadsheet", extensions: ["fods"]},
  {name: "OpenDocument Spreadsheet", extensions: ["fods"]}
];

export async function ExportDailyMovimentations(locale: any, data: any, will_create?: boolean) {
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
          v: `${total}`, t: "s",
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
    /* calculate column width */
    const max_width = movimentations.map((item: { v: any; }[]) => ({
      id: item[0].v,
      driver: item[1].v,
      vehicle: item[2].v,
      enter_time: item[3].v,
      exit_time: item[4].v,
      total: item[5].v,
    })).reduce((acc: any,  curr: any) => {
      acc[0].wch = Math.max(acc[0].wch, String(curr.id).length);
      acc[1].wch = Math.max(acc[1].wch, String(curr.driver).length);
      acc[2].wch = Math.max(acc[2].wch, String(curr.vehicle).length);
      acc[3].wch = Math.max(acc[3].wch, String(curr.enter_time).length);
      acc[4].wch = Math.max(acc[4].wch, String(curr.exit_time).length);
      acc[5].wch = Math.max(acc[5].wch, String(curr.total).length);
      return acc;
    },
    [
      {
        wch:10
      },
      {
        wch: String(locale['driver']).length
      },
      {
        wch: String(locale['vehicle']).length
      },
      {
        wch: String(locale['enter-time']).length
      },
      {
        wch: String(locale['exit-time']).length
      },
      {
        wch: String(locale['total']).length
      }
    ]
    );
    ws["!cols"] = max_width;
    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 2 + Number(movimentations.length), c: 0 }, e: { r: 2 + Number(movimentations.length), c: 4 } }
    ];
    ws["!merges"] = merge;
    XLSX.utils.book_append_sheet(wb, ws, locale['title']);
    const d = XLSX.write(wb, {type: "buffer", bookType: selected.slice(selected.lastIndexOf(".") + 1) as any}) as Uint8Array;
    if (will_create) {
      await create_report({
        link: selected,
        format: "excel",
        model: "dailyMovimentations",
        file_data: JSON.stringify({ locale, data})
      });
    }
    await writeBinaryFile(selected, d);
    await message(locale['file-saved']);
  } catch(e) {
    await message((e as Error).message || (e as string), { title: locale['file-cannot-be-saved'], type: "error"});
  }
}