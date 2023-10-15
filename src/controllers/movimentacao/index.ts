import SQLite from 'tauri-plugin-sqlite-api';

// MOVIMENTACAO
// LISTAR MOVIMENTACOES
export async function listar_movimentacoes() {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
            SELECT *
            FROM movimentacao
            ORDER BY entrada DESC;
        `);
    
    if (results.length > 0) {
        let condutores = await db.select<Array<any>>(`
            SELECT *
            FROM condutor
            WHERE id IN ( ${results.map((movimentacao) => movimentacao.condutor_id).join(", ")} );
        `)
        let veiculos = await db.select<Array<any>>(`
            SELECT *
            FROM veiculo
            WHERE id in ( ${results.map((movimentacao) => movimentacao.veiculo_id).join(", ")} );
        `)
        if (condutores.length > 0 && condutores[0] && veiculos.length > 0 && veiculos[0]) {
            let modelos = await db.select<Array<any>>(`
                SELECT *
                FROM modelo
                WHERE id in ( ${veiculos.map((veiculo) => veiculo.modelo_id).join(", ")} );
            `)
            if (modelos.length > 0) {
                let marcas = await db.select<Array<any>>(`
                    SELECT *
                    FROM marca
                    WHERE id in ( ${modelos.map((modelo) => modelo.marca_id).join(", ")} );
                `)
                if (marcas.length > 0) {
                    results = results.map((movimentacao) => {
                        let { condutor_id, veiculo_id, ...rest } = movimentacao;
                        let condutor = condutores.filter((condutor) => condutor.id === condutor_id)[0];
                        let { modelo_id, ...veiculoRest } = veiculos.filter((veiculo) => veiculo.id === veiculo_id)[0];
                        let { marca_id, ...modeloRest } = modelos.filter((modelo) => modelo.id === modelo_id)[0];
                        let marca = marcas.filter((marca) => marca.id === marca_id)[0];
                        return {
                            ...rest,
                            condutor,
                            veiculo: {
                                ...veiculoRest,
                                modelo: {
                                    ...modeloRest,
                                    marca,
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    
    return results;
}

// RETORNAR MOVIMENTACAO PAGINADO
export async function listar_movimentacoes_paginated(page: Number, perPage: Number) {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM movimentacao
        ORDER BY entrada DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<{ total_rows: Number }>>(`SELECT COUNT(*) AS total_rows FROM movimentacao;`);
    
    if (results.length > 0) {
        let condutores = await db.select<Array<any>>(`
            SELECT *
            FROM condutor
            WHERE id IN ( ${results.map((movimentacao) => movimentacao.condutor_id).join(", ")} );
        `)
        let veiculos = await db.select<Array<any>>(`
            SELECT *
            FROM veiculo
            WHERE id in ( ${results.map((movimentacao) => movimentacao.veiculo_id).join(", ")} );
        `)
        if (condutores.length > 0 && condutores[0] && veiculos.length > 0 && veiculos[0]) {
            let modelos = await db.select<Array<any>>(`
                SELECT *
                FROM modelo
                WHERE id in ( ${veiculos.map((veiculo) => veiculo.modelo_id).join(", ")} );
            `)
            if (modelos.length > 0) {
                let marcas = await db.select<Array<any>>(`
                    SELECT *
                    FROM marca
                    WHERE id in ( ${modelos.map((modelo) => modelo.marca_id).join(", ")} );
                `)
                if (marcas.length > 0) {
                    results = results.map((movimentacao) => {
                        let { condutor_id, veiculo_id, ...rest } = movimentacao;
                        let condutor = condutores.filter((condutor) => condutor.id === condutor_id)[0];
                        let { modelo_id, ...veiculoRest } = veiculos.filter((veiculo) => veiculo.id === veiculo_id)[0];
                        let { marca_id, ...modeloRest } = modelos.filter((modelo) => modelo.id === modelo_id)[0];
                        let marca = marcas.filter((marca) => marca.id === marca_id)[0];
                        return {
                            ...rest,
                            condutor,
                            veiculo: {
                                ...veiculoRest,
                                modelo: {
                                    ...modeloRest,
                                    marca,
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    
    return { results, totalItems: Number(totalPages[0].total_rows), totalPages: Math.ceil(Number(totalPages[0].total_rows) / Number(perPage))  };
}

// RETORNAR MOVIMENTACAO DESTE MÊS
export async function listar_movimentacoes_deste_mes() {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM movimentacao
        WHERE entrada >= DATE('now', 'start of month')
        AND entrada < DATE('now', 'start of month', '+1 month');
        ORDER BY entrada DESC
    `);
    if (results.length > 0) {
        let condutores = await db.select<Array<any>>(`
            SELECT *
            FROM condutor
            WHERE id IN ( ${results.map((movimentacao) => movimentacao.condutor_id).join(", ")} );
        `)
        let veiculos = await db.select<Array<any>>(`
            SELECT *
            FROM veiculo
            WHERE id in ( ${results.map((movimentacao) => movimentacao.veiculo_id).join(", ")} );
        `)
        if (condutores.length > 0 && condutores[0] && veiculos.length > 0 && veiculos[0]) {
            let modelos = await db.select<Array<any>>(`
                SELECT *
                FROM modelo
                WHERE id in ( ${veiculos.map((veiculo) => veiculo.modelo_id).join(", ")} );
            `)
            if (modelos.length > 0) {
                let marcas = await db.select<Array<any>>(`
                    SELECT *
                    FROM marca
                    WHERE id in ( ${modelos.map((modelo) => modelo.marca_id).join(", ")} );
                `)
                if (marcas.length > 0) {
                    results = results.map((movimentacao) => {
                        let { condutor_id, veiculo_id, ...rest } = movimentacao;
                        let condutor = condutores.filter((condutor) => condutor.id === condutor_id)[0];
                        let { modelo_id, ...veiculoRest } = veiculos.filter((veiculo) => veiculo.id === veiculo_id)[0];
                        let { marca_id, ...modeloRest } = modelos.filter((modelo) => modelo.id === modelo_id)[0];
                        let marca = marcas.filter((marca) => marca.id === marca_id)[0];
                        return {
                            ...rest,
                            condutor,
                            veiculo: {
                                ...veiculoRest,
                                modelo: {
                                    ...modeloRest,
                                    marca,
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    return results;
}

export async function get_total_day_value() {
    const db = await SQLite.open('../src/db/cavalier.db');
    let results = await db.select<Array<{ total: number }>>(`
        SELECT SUM(valor_total) as total
        FROM movimentacao
        WHERE DATE(entrada) = DATE('now')
    `);
    return results[0]['total'];
}

// RETORNAR MOVIMENTACAO
export async function retornar_movimentacao(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    let result = await db.select<Array<any>>(`
        SELECT *
        FROM movimentacao
        WHERE id = ?1;
    `, [id]);
    if (result.length > 0 && result[0]) {
        let condutor = await db.select<Array<any>>(`
            SELECT *
            FROM condutor
            WHERE id = ${result[0].condutor_id};
        `);
        let veiculo = await db.select<Array<any>>(`
            SELECT *
            FROM veiculo
            WHERE id = ${result[0].veiculo_id};
        `);
        if (condutor.length > 0 && condutor[0] && veiculo.length > 0 && veiculo[0]) {
            let modelo = await db.select<Array<any>>(`
                SELECT *
                FROM modelo
                WHERE id = ${veiculo[0].modelo_id};
            `);
            if (modelo.length > 0 && modelo[0]) {
                let marca = await db.select<Array<any>>(`
                    SELECT *
                    FROM marca
                    WHERE id = ${modelo[0].marca_id};
                `);
                if (marca.length > 0 && marca[0]) {
                    result = result.map((movimentacao) => {
                        let { condutor_id, veiculo_id, ...rest } = movimentacao;
                        let { modelo_id, ...veiculoRest} = veiculo[0];
                        let { marca_id, ...modeloRest} = modelo[0];
                        return {
                            ...rest,
                            condutor: condutor[0],
                            veiculo: {
                                ...veiculoRest,
                                modelo: {
                                    ...modeloRest,
                                    marca: marca[0]
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    return result[0];
}

// CRIAR MOVIMENTACAO
export async function criar_movimentacao(movimentacao: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        INSERT INTO movimentacao (ativo, atualizacao, cadastro, entrada, saida, tempo, tempo_desconto,
        tempo_multa, valor_desconto, valor_hora, valor_hora_multa, valor_multa, valor_total, condutor_id, veiculo_id)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15);
    `, [true, null, new Date(), movimentacao.entrada, movimentacao.saida, movimentacao.tempo,
        movimentacao.tempo_desconto, movimentacao.tempo_multa, movimentacao.valor_desconto, movimentacao.valor_hora,
        movimentacao.valor_hora_multa, movimentacao.valor_multa, movimentacao.valor_total, movimentacao.condutor_id,
        movimentacao.veiculo_id]);
    
}

// EDITAR MOVIMENTACAO
export async function editar_movimentacao(id: string, movimentacao: any) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        UPDATE movimentacao
        SET entrada = ?1, saida = ?2, tempo = ?3, tempo_desconto = ?4, tempo_multa = ?5, valor_desconto = ?6,
        valor_hora = ?7, valor_hora_multa = ?8, valor_multa = ?9, valor_total = ?10, condutor_id = ?11, veiculo_id = ?12,
        ativo = ?13, atualizacao = ?14
        WHERE id = ?15;
    `,[
        movimentacao.entrada,
        movimentacao.saida,
        movimentacao.tempo,
        movimentacao.tempo_desconto,
        movimentacao.tempo_multa,
        movimentacao.valor_desconto,
        movimentacao.valor_hora,
        movimentacao.valor_hora_multa,
        movimentacao.valor_multa,
        movimentacao.valor_total,
        movimentacao.condutor_id,
        movimentacao.veiculo_id,
        movimentacao.ativo,
        new Date(),
        id
    ]);
    
}

// DELETAR MOVIMENTACAO
export async function deletar_movimentacao(id: string) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute(`
        DELETE FROM movimentacao
        WHERE id = ?1;
    `, [id]);
    
}