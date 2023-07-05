import SQLite from 'tauri-plugin-sqlite-api';

export async function init_db() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        CREATE TABLE IF NOT EXISTS marca
        (
            id INTEGER PRIMARY KEY,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            nome TEXT NOT NULL,
            UNIQUE (nome)
        );

        CREATE TABLE IF NOT EXISTS modelo
        (
            id INTEGER PRIMARY KEY,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            nome TEXT NOT NULL,
            marca_id INTEGER NOT NULL,
            FOREIGN KEY (marca_id) REFERENCES marca (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            UNIQUE (nome)
        );

        CREATE TABLE IF NOT EXISTS veiculo
        (
            id INTEGER PRIMARY KEY,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            ano INTEGER NOT NULL,
            cor TEXT NOT NULL,
            placa TEXT NOT NULL,
            tipo TEXT NOT NULL,
            modelo_id INTEGER NOT NULL,
            FOREIGN KEY (modelo_id) REFERENCES modelo (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            UNIQUE (placa)
        );

        CREATE TABLE IF NOT EXISTS condutor
        (
            id INTEGER PRIMARY KEY,
            ativo BOOLEAN NOT NULL,
            atualizacao TEXT,
            cadastro TEXT NOT NULL,
            cpf TEXT NOT NULL,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            tempo_gasto INTEGER,
            UNIQUE (cpf)
        );

        CREATE TABLE IF NOT EXISTS movimentacao
        (
            id INTEGER PRIMARY KEY,
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
            FOREIGN KEY (veiculo_id) REFERENCES veiculo (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            FOREIGN KEY (condutor_id) REFERENCES condutores (id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            UNIQUE (veiculo_id)
        );
    `);
    await db.close();
}

// MARCAS
// LISTAR MARCAS
export async function listar_marcas() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT * FROM marca;
    `);
    await db.close();
}

// RETORNAR MARCA
export async function retornar_marca(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT * FROM marca WHERE id=?1;
    `, [id]);
    await db.close();
}

// CRIAR MARCA
export async function criar_marca(marca: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO marca VALUES (SELECT IFNULL(MAX(id), 0) + 1 FROM marca, ?1, ?2, ?3, ?4)
    `, [true, null, new Date(), marca.nome]);
    await db.close();
}

// EDITAR MARCA
export async function editar_marca(id: string, marca: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE marca
        SET nome = ?1, atualizacao = ?2
        WHERE id = ?3;
    `, [marca.nome, new Date(), id]);
    await db.close();
}

// DELETAR MARCA
export async function deletar_marca(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM marca
        WHERE id = ?1;
    `, [id]);
    await db.close();
}

// MODELOS
// LISTAR MODELOS
export async function listar_modelos() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT m.*, ma.*
        FROM modelo m
        JOIN marca ma ON m.marca_id = ma.id;
    `);
    await db.close();
}

// RETORNAR MODELO
export async function retornar_modelo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT m.*, ma.*
        FROM modelo m
        JOIN marca ma ON m.marca_id = ma.id
        WHERE m.id=?1;
    `, [id]);
    await db.close();
}

// CRIAR MODELO
export async function criar_modelo(modelo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO modelo VALUES (SELECT IFNULL(MAX(id), 0) + 1 FROM modelo, ?1, ?2, ?3, ?4, ?5)
    `, [true, null, new Date(), modelo.nome, modelo.id]);
    await db.close();
}

// EDITAR MODELO
export async function editar_modelo(id: string, modelo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE modelo
        SET nome = ?1, ativo = ?2, marca_id = ?3, atualizacao = ?4
        WHERE id = ?5;
    `, [modelo.nome, modelo.ativo, modelo.marca_id, new Date(), id]);
    await db.close();
}

// DELETAR MODELO
export async function deletar_modelo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM modelo
        WHERE id = ?1;
    `, [id]);
    await db.close();
}

// VEICULOS
// LISTAR VEICULOS
export async function listar_veiculos() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT v.*, m.*, ma.*
        FROM veiculo v
        JOIN modelo m ON v.modelo_id = m.id
        JOIN marca ma ON m.marca_id = ma.id;
    `);
    await db.close();
}

// RETORNAR VEICULO
export async function retornar_veiculo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT v.*, m.*, ma.*
        FROM veiculo v
        JOIN modelo m ON v.modelo_id = m.id
        JOIN marca ma ON m.marca_id = ma.id;
        WHERE v.id=?1;
    `, [id]);
    await db.close();
}

// CRIAR VEICULO
export async function criar_veiculo(veiculo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO veiculo
        VALUES (SELECT IFNULL(MAX(id), 0) + 1 FROM veiculo, ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);
    `, [true, null, new Date(), veiculo.ano, veiculo.cor, veiculo.placa, veiculo.tipo, veiculo.modelo_id]);
    await db.close();
}

// EDITAR VEICULO
export async function editar_veiculo(id: string, veiculo: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE veiculo
        SET placa = ?1, cor = ?2, ano = ?3, tipo = ?4, ativo = ?5, atualização = ?6
        WHERE id = ?7;
    `, [veiculo.placa, veiculo.cor, veiculo.ano, veiculo.tipo, veiculo.ativo, new Date(), id]);
    await db.close();
}

// DELETAR VEICULO
export async function deletar_veiculo(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM veiculo
        WHERE id = ?1;
    `, [id]);
    await db.close();
}

// CONDUTORES
// LISTAR CONDUTORES
export async function listar_condutores() {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT *
        FROM condutor;
    `);
    await db.close();
}

// RETORNAR CONDUTOR
export async function retornar_condutor(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        SELECT * FROM condutor WHERE id=?1;
    `, [id]);
    await db.close();
}

// CRIAR CONDUTOR
export async function criar_condutor(condutor: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO condutor
        VALUES (SELECT IFNULL(MAX(id), 0) + 1 FROM veiculo, ?1, ?2, ?3, ?4, ?5, ?6, ?7);
    `, [true, null, new Date(), condutor.cpf, condutor.nome, condutor.telefone, condutor.tempo_gasto]);
    await db.close();
}

// EDITAR CONDUTOR
export async function editar_condutor(id: string, condutor: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE condutor
        SET cpf = ?1, nome = ?2, telefone = ?3, tempo_gasto = ?4, ativo = ?5, atualização = ?6
        WHERE id = ?7;
    `, [condutor.cpf, condutor.nome, condutor.telefone, condutor.tempo_gasto, condutor.ativo, new Date(), id]);
    await db.close();
}

// DELETAR CONDUTOR
export async function deletar_condutor(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM condutor
        WHERE id = ?1;
    `, [id]);
    await db.close();
}

// MOVIMENTACAO
// LISTAR MOVIMENTACOES
export async function listar_movimentacoes() {
    const db = await SQLite.open('./test.db');
    const result = await db.execute(`
        SELECT mv.*, c.*, v.*, m.*, ma.*
        FROM movimentacao mv
        JOIN condutor c ON mv.condutor_id = c.id
        JOIN veiculo v ON mv.veiculo_id = v.id
        JOIN modelo m ON v.modelo_id = m.id
        JOIN marca ma ON m.marca_id = ma.id;
    `);
    await db.close();
    return result;
}

// RETORNAR MOVIMENTACAO
export async function retornar_movimentacao(id: string) {
    const db = await SQLite.open('./test.db');
    const result = await db.execute(`
        SELECT mv.*, c.*, v.*, m.*, ma.*
        FROM movimentacao mv
        JOIN condutor c ON mv.condutor_id = c.id
        JOIN veiculo v ON mv.veiculo_id = v.id
        JOIN modelo m ON v.modelo_id = m.id
        JOIN marca ma ON m.marca_id = ma.id
        WHERE mv.id = ?1;
    `, [id]);
    await db.close();
    return result;
}

// CRIAR MOVIMENTACAO
export async function criar_movimentacao(movimentacao: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO movimentacao (id, ativo, atualizacao, cadastro, entrada, saida, tempo, tempo_desconto,
        tempo_multa, valor_desconto, valor_hora, valor_hora_multa, valor_multa, valor_total, condutor_id, veiculo_id)
        VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM movimentacao), ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15);
    `, [true, null, new Date(), new Date(), movimentacao.entrada, movimentacao.saida, movimentacao.tempo,
        movimentacao.tempo_desconto, movimentacao.tempo_multa, movimentacao.valor_desconto, movimentacao.valor_hora,
        movimentacao.valor_hora_multa, movimentacao.valor_multa, movimentacao.valor_total, movimentacao.condutor_id,
        movimentacao.veiculo_id]);
    await db.close();
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
    await db.close();
}

// DELETAR MOVIMENTACAO
export async function deletar_movimentacao(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM movimentacao
        WHERE id = ?1;
    `, [id]);
    await db.close();
}