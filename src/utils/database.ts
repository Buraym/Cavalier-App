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

        CREATE TABLE IF NOT EXISTS condutores
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

// RETORNAR MARCAS
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
        SET nome = ?1
        WHERE id = ?2;
    `, [id, marca.nome]);
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