import SQLite from 'tauri-plugin-sqlite-api';

// CONDUTORES

// RETURN PAGINATED DRIvERS LIST
export async function list_drivers_paginated(page: Number, perPage: Number) {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM condutor
        ORDER BY cadastro DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<{ total_rows: Number }>>(`SELECT COUNT(*) AS total_rows FROM condutor;`);
    
    return {
        results,
        totalItems: Number(totalPages[0].total_rows),
        totalPages: Math.ceil(Number(totalPages[0].total_rows) / Number(perPage))
    };
}

// LISTAR CONDUTORES
export async function listar_condutores() {
    const db = await SQLite.open('../src/db/cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT *
        FROM condutor;
    `);
    
    return result;
}

// RETORNAR CONDUTOR
export async function retornar_condutor(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM condutor WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// CRIAR CONDUTOR
export async function criar_condutor(condutor: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        INSERT INTO condutor ( ativo, atualizacao, cadastro, cpf, nome, telefone, tempo_gasto )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0);
    `, [true, null, new Date(), condutor.cpf, condutor.nome, condutor.telefone]);
    db.close();
}

// EDITAR CONDUTOR
export async function editar_condutor(id: string, condutor: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        UPDATE condutor
        SET cpf = ?1, nome = ?2, telefone = ?3, ativo = ?4, atualizacao = ?5
        WHERE id = ?6;
    `, [condutor.cpf, condutor.nome, condutor.telefone, condutor.ativo, new Date(), id]);
    
}

// DELETAR CONDUTOR
export async function deletar_condutor(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        DELETE FROM condutor
        WHERE id = ?1;
    `, [id]);
    
}