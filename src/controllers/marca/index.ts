import SQLite from 'tauri-plugin-sqlite-api';

// MARCAS
// LISTAR MARCAS
export async function listar_marcas() {
    const db = await SQLite.open('./test.db');
    const results = await db.select<Array<any>>(`
        SELECT * FROM marca;
    `);
    return results;
}

// RETORNAR MARCA
export async function retornar_marca(id: string) {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM marca WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// CRIAR MARCA
export async function criar_marca(marca: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO marca (ativo, atualizacao, cadastro, nome)
        VALUES (?1, ?2, ?3, ?4)
    `, [true, null, new Date(), marca.nome]);
    
}

// EDITAR MARCA
export async function editar_marca(id: string, marca: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE marca
        SET nome = ?1, ativo = ?2, atualizacao = ?3
        WHERE id = ?4;
    `, [marca.nome, marca.ativo, new Date(), id]);
    
}

// DELETAR MARCA
export async function deletar_marca(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM marca
        WHERE id = ?1;
    `, [id]);
    
}