import SQLite from 'tauri-plugin-sqlite-api';

// VEICULOS
// LISTAR VEICULOS
export async function listar_veiculos() {
    const db = await SQLite.open('./test.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM veiculo;
    `);
    if (results.length > 0) {
        let modelos = await db.select<Array<any>>(`
            SELECT *
            FROM modelo
            WHERE id IN ( ${results.map((item) => item.modelo_id).join(", ")} );
        `);
        if (modelos.length > 0) {
            let marcas = await db.select<Array<any>>(`
                SELECT *
                FROM marca
                WHERE id IN ( ${modelos.map((item) => item.marca_id).join(", ")} );
            `);
            results = results.map((item) => {
                let { modelo_id, ...rest } = item;
                let { marca_id, ...modeloRest } = modelos.filter((modelo) => modelo.id === modelo_id)[0];
                return {
                    ...rest,
                    modelo: {
                        ...modeloRest,
                        marca: marcas.filter((marca) => marca.id === marca_id)[0]
                    }
                }
            })
        }
    }
    
    return results;
}

// RETORNAR VEICULO
export async function retornar_veiculo(id: string) {
    const db = await SQLite.open('./test.db');
    let result = await db.select<Array<any>>(`
        SELECT *
        FROM veiculo
        WHERE id = ?1;
    `, [id]);
    if (result.length > 0 && result[0]) {
        let modelo = await db.select<Array<any>>(`
            SELECT *
            FROM modelo
            WHERE id = ${result[0].modelo_id};
        `);
        if (modelo.length > 0 && modelo[0]) {
            let marca = await db.select<Array<any>>(`
                SELECT *
                FROM marca
                WHERE id = ${modelo[0].marca_id};
            `);
            if (marca.length > 0 && marca[0]) {
                result = result.map((veiculo) => {
                    let {modelo_id, ...rest} = veiculo;
                    let {marca_id, ...modeloRest} = modelo[0];
                    return {
                        ...rest,
                        modelo: {
                            ...modeloRest,
                            marca: marca[0]
                        }
                    }
                })
            }
        }
    }
    
    return result[0];
}

// CRIAR VEICULO
export async function criar_veiculo(veiculo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO veiculo (ativo, atualizacao, cadastro, ano, cor, placa, tipo, modelo_id)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);
    `, [true, null, new Date(), veiculo.ano, veiculo.cor, veiculo.placa, veiculo.tipo, veiculo.modelo_id]);
    
}

// EDITAR VEICULO
export async function editar_veiculo(id: string, veiculo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE veiculo
        SET placa = ?1, cor = ?2, ano = ?3, tipo = ?4, ativo = ?5, atualizacao = ?6
        WHERE id = ?7;
    `, [veiculo.placa, veiculo.cor, veiculo.ano, veiculo.tipo, veiculo.ativo, new Date(), id]);
    
}

// DELETAR VEICULO
export async function deletar_veiculo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM veiculo
        WHERE id = ?1;
    `, [id]);
    
}