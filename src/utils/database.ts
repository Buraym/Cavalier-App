import SQLite from 'tauri-plugin-sqlite-api';

// INICIA O BANCO SE JÁ NÃO TIVER INICIADO
export async function init_db() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        CREATE TABLE IF NOT EXISTS marca
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            nome TEXT NOT NULL,
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER,
            UNIQUE (nome)
        );

        CREATE TABLE IF NOT EXISTS modelo
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            nome TEXT NOT NULL,
            marca_id INTEGER NOT NULL,
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER,
            FOREIGN KEY (marca_id) REFERENCES marca (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            UNIQUE (nome)
        );

        CREATE TABLE IF NOT EXISTS veiculo
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            ano INTEGER NOT NULL,
            cor TEXT NOT NULL,
            placa TEXT NOT NULL,
            tipo TEXT NOT NULL,
            modelo_id INTEGER NOT NULL,
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER,
            FOREIGN KEY (modelo_id) REFERENCES modelo (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            UNIQUE (placa)
        );

        CREATE TABLE IF NOT EXISTS condutor
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            cpf TEXT NOT NULL,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            tempo_gasto INTEGER,
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER,
            UNIQUE (cpf)
        );

        CREATE TABLE IF NOT EXISTS movimentacao
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            entrada TEXT NOT NULL,
            saida TEXT,
            tempo INTEGER,
            tempo_desconto INTEGER,
            tempo_multa INTEGER,
            valor_desconto NUMERIC(38,2),
            valor_hora NUMERIC(38,2),
            valor_hora_multa NUMERIC(38,2),
            valor_multa NUMERIC(38,2),
            valor_total NUMERIC(38,2),
            condutor_id INTEGER NOT NULL,
            veiculo_id INTEGER NOT NULL,
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER,
            FOREIGN KEY (veiculo_id) REFERENCES veiculo (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            FOREIGN KEY (condutor_id) REFERENCES condutores (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        );

        CREATE TABLE IF NOT EXISTS configuracao
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            fim_expediente TEXT,
            gerar_desconto BOOLEAN,
            inicio_expediente TEXT,
            tempo_de_desconto TEXT,
            tempo_para_desconto TEXT,
            vagas_carro INTEGER,
            vagas_moto INTEGER,
            vagas_van INTEGER,
            valor_hora NUMERIC(38, 2),
            valor_minuto_hora NUMERIC(38, 2),
            criado_por INTEGER,
            atualizado_por INTEGER,
            deletado_por INTEGER
        );

        INSERT INTO configuracao
        (
            id,
            ativo,
            atualizacao,
            cadastro,
            fim_expediente,
            gerar_desconto,
            inicio_expediente,
            tempo_de_desconto,
            tempo_para_desconto,
            vagas_carro,
            vagas_moto,
            vagas_van,
            valor_hora,
            valor_minuto_hora
        )
        SELECT 1, 1, NULL, DATE('now'), TIME('18:00:00'), 1, TIME('09:00:00'), TIME('01:00:00'), TIME('00:30:00'), 10, 5, 2, 15.50, 0.25
        WHERE NOT EXISTS (SELECT 1 FROM configuracao);

        CREATE TABLE IF NOT EXISTS usuario
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            nome VARCHAR(100) NOT NULL,
            documento VARCHAR(20) NOT NULL,
            contato VARCHAR(20),
            cargo VARCHAR(50)
        );
    `);
    db.close();
}

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
        SET nome = ?1, ativo = $2, atualizacao = ?3
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

// MODELOS
// LISTAR MODELOS
export async function listar_modelos() {
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO modelo (ativo, atualizacao, cadastro, nome, marca_id)
        VALUES (?1, ?2, ?3, ?4, ?5)
    `, [true, null, new Date(), modelo.nome, modelo.marca_id]);
    
}

// EDITAR MODELO
export async function editar_modelo(id: string, modelo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE modelo
        SET nome = ?1, ativo = ?2, marca_id = ?3, atualizacao = ?4
        WHERE id = ?5;
    `, [modelo.nome, modelo.ativo, modelo.marca_id, new Date(), id]);
    
}

// DELETAR MODELO
export async function deletar_modelo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM modelo
        WHERE id = ?1;
    `, [id]);
    
}

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

// CONDUTORES
// LISTAR CONDUTORES
export async function listar_condutores() {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT *
        FROM condutor;
    `);
    
    return result;
}

// RETORNAR CONDUTOR
export async function retornar_condutor(id: string) {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM condutor WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// CRIAR CONDUTOR
export async function criar_condutor(condutor: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO condutor ( ativo, atualizacao, cadastro, cpf, nome, telefone, tempo_gasto )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0);
    `, [true, null, new Date(), condutor.cpf, condutor.nome, condutor.telefone]);
    db.close();
}

// EDITAR CONDUTOR
export async function editar_condutor(id: string, condutor: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE condutor
        SET cpf = ?1, nome = ?2, telefone = ?3, tempo_gasto = ?4, ativo = ?5, atualizacao = ?6
        WHERE id = ?7;
    `, [condutor.cpf, condutor.nome, condutor.telefone, condutor.tempo_gasto, condutor.ativo, new Date(), id]);
    
}

// DELETAR CONDUTOR
export async function deletar_condutor(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM condutor
        WHERE id = ?1;
    `, [id]);
    
}

// MOVIMENTACAO
// LISTAR MOVIMENTACOES
export async function listar_movimentacoes() {
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM movimentacao
        ORDER BY entrada DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<any>>(`SELECT COUNT(*) AS total_rows FROM movimentacao;`);
    
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
    const db = await SQLite.open('./test.db');
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

// RETORNAR MOVIMENTACAO
export async function retornar_movimentacao(id: string) {
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
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
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM movimentacao
        WHERE id = ?1;
    `, [id]);
    
}

// CONFIGURACOES
// RETORNAR CONFIGURACAO
export async function retornar_configuracao() {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT *
        FROM configuracao
        LIMIT 1;
    `);
    
    return result[0];
}

// CRIAR CONFIGURACAO
export async function criar_configuracao(configuracao: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO configuracao (id, ativo, atualizacao, cadastro, fim_expediente, gerar_desconto, inicio_expediente,
        tempo_de_desconto, tempo_para_desconto, vagas_carro, vagas_moto, vagas_van, valor_hora, valor_minuto_hora)
        VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM configuracao), ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13);
    `, [configuracao.ativo, null, new Date(), configuracao.cadastro, configuracao.fim_expediente,
        configuracao.gerar_desconto, configuracao.inicio_expediente, configuracao.tempo_de_desconto,
        configuracao.tempo_para_desconto, configuracao.vagas_carro, configuracao.vagas_moto,
        configuracao.vagas_van, configuracao.valor_hora, configuracao.valor_minuto_hora]);
    
}

// EDITAR CONFIGURACAO
export async function editar_configuracao(configuracao: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE configuracao
        SET ativo = ?1, atualizacao = ?2, cadastro = ?3, fim_expediente = ?4, gerar_desconto = ?5, inicio_expediente = ?6,
        tempo_de_desconto = ?7, tempo_para_desconto = ?8, vagas_carro = ?9, vagas_moto = ?10, vagas_van = ?11,
        valor_hora = ?12, valor_minuto_hora = ?13
        WHERE id = 1;
    `, [configuracao.ativo, new Date(), configuracao.cadastro, configuracao.fim_expediente,
        configuracao.gerar_desconto, configuracao.inicio_expediente, configuracao.tempo_de_desconto,
        configuracao.tempo_para_desconto, configuracao.vagas_carro, configuracao.vagas_moto,
        configuracao.vagas_van, configuracao.valor_hora, configuracao.valor_minuto_hora]);
    
}