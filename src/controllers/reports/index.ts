import SQLite from 'tauri-plugin-sqlite-api';

// MARCAS

// RETURN PAGINATED REPORTS LIST
export async function list_reports_paginated(page: Number, perPage: Number) {
    const db = await SQLite.open('./cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM report
        ORDER BY cadastro DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<{ total_rows: Number }>>(`SELECT COUNT(*) AS total_rows FROM report;`);
    
    return {
        results,
        totalItems: Number(totalPages[0].total_rows),
        totalPages: Math.ceil(Number(totalPages[0].total_rows) / Number(perPage))
    };
}

// LIST REPORTS
export async function list_reports() {
    const db = await SQLite.open('./cavalier.db');
    const results = await db.select<Array<any>>(`
        SELECT * FROM report;
    `);
    return results;
}

// LIST MONTHLY REPORTS
export async function list_monthly_reports() {
    const db = await SQLite.open('./cavalier.db');
    const results = await db.select<Array<any>>(`
        SELECT * FROM report
        WHERE created_at >= DATE('now', 'start of month')
        AND created_at < DATE('now', 'start of month', '+1 month');
        ORDER BY created_at DESC;
    `);
    return results;
}

// RETURN REPORT
export async function return_report(id: string) {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM report WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// CREATE REPORT
export async function create_report(report: any) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        INSERT INTO report (ativo, cadastro, link, format, model)
        VALUES (?1, ?2, ?3, ?4)
    `, [true, new Date(), report.link, report.format, report.model]);
    
}


// DELETE REPORT
export async function delete_report(id: string) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        DELETE FROM report
        WHERE id = ?1;
    `, [id]);
    
}