import SQLite from 'tauri-plugin-sqlite-api';

// CONDUTORES
// LISTAR CONDUTORES
export async function listar_condutores() {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT *
        FROM condutor;
    `);
    
    return result;
}

// RETORNAR CONDUTOR
export async function retornar_condutor(id: string) {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM condutor WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// CRIAR CONDUTOR
export async function criar_condutor(condutor: any) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        INSERT INTO condutor ( ativo, atualizacao, cadastro, cpf, nome, telefone, tempo_gasto )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0);
    `, [true, null, new Date(), condutor.cpf, condutor.nome, condutor.telefone]);
    db.close();
}

// EDITAR CONDUTOR
export async function editar_condutor(id: string, condutor: any) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        UPDATE condutor
        SET cpf = ?1, nome = ?2, telefone = ?3, tempo_gasto = ?4, ativo = ?5, atualizacao = ?6
        WHERE id = ?7;
    `, [condutor.cpf, condutor.nome, condutor.telefone, condutor.tempo_gasto, condutor.ativo, new Date(), id]);
    
}

// DELETAR CONDUTOR
export async function deletar_condutor(id: string) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        DELETE FROM condutor
        WHERE id = ?1;
    `, [id]);
    
}