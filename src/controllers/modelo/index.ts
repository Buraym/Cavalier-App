import SQLite from 'tauri-plugin-sqlite-api';

// MODELOS

// RETURN PAGINATED MODELS LIST
export async function list_models_paginated(page: Number, perPage: Number) {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM modelo
        ORDER BY cadastro DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<{ total_rows: Number }>>(`SELECT COUNT(*) AS total_rows FROM modelo;`);
    let marcas = await db.select<Array<any>>(`
        SELECT *
        FROM marca
        WHERE id IN ( ${results.map((item) => item.marca_id).join(", ")} );
    `);
    results = results.map((modelo) => {
        let { marca_id, ...rest } = modelo;
        return {
            ...rest,
            marca: marcas.filter((marca) => marca.id === marca_id)[0]
        }
    });
    
    return {
        results,
        totalItems: Number(totalPages[0].total_rows),
        totalPages: Math.ceil(Number(totalPages[0].total_rows) / Number(perPage))
    };
}

// LISTAR MODELOS
export async function listar_modelos() {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM modelo;
    `);
    let marcas = await db.select<Array<any>>(`
        SELECT *
        FROM marca
        WHERE id IN ( ${results.map((item) => item.marca_id).join(", ")} );
    `);
    results = results.map((modelo) => {
        let { marca_id, ...rest } = modelo;
        return {
            ...rest,
            marca: marcas.filter((marca) => marca.id === marca_id)[0]
        }
    });
    
    return results;
}

// RETORNAR MODELO
export async function retornar_modelo(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    let result = await db.select<Array<any>>(`
        SELECT * FROM modelo WHERE id=?1;
    `, [id]);
    if (result.length > 0 && result[0]) {
        const marca = await db.select<Array<any>>(`
            SELECT * FROM marca WHERE id = ${result[0].marca_id};
        `);
        if (marca[0]) {
            result = result.map((modelo) => {
                let { marca_id, ...rest } = modelo;
                return {
                    ...rest,
                    marca: marca[0]
                }
            })
        }
    }
    return result[0];
}

// CRIAR MODELO
export async function criar_modelo(modelo: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        INSERT INTO modelo (ativo, atualizacao, cadastro, nome, marca_id)
        VALUES (?1, ?2, ?3, ?4, ?5)
    `, [true, null, new Date(), modelo.nome, modelo.marca_id]);
    
}

// EDITAR MODELO
export async function editar_modelo(id: string, modelo: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        UPDATE modelo
        SET nome = ?1, ativo = ?2, marca_id = ?3, atualizacao = ?4
        WHERE id = ?5;
    `, [modelo.nome, modelo.ativo, modelo.marca_id, new Date(), id]);
    
}

// DELETAR MODELO
export async function deletar_modelo(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        DELETE FROM modelo
        WHERE id = ?1;
    `, [id]);
    
}