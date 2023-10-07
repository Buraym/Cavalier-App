import SQLite from 'tauri-plugin-sqlite-api';

// INICIA O BANCO SE JÁ NÃO TIVER INICIADO
export async function init_db() {
    const db = await SQLite.open('./cavalier.db');
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

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Honda'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Honda');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Fiat'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Fiat');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Ford'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Ford');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Chevrolet'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Chevrolet');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Wolkswagen'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Wolkswagen');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'BMW'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'BMW');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Mercedez-Benz'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Mercedez-Benz');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Citroën'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Citroën');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Nissan'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Nissan');
        
        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Renault'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Renault');

        INSERT INTO marca (
            id,
            ativo,
            atualizacao,
            cadastro,
            nome
        )
        SELECT 
            (SELECT COALESCE(MAX(id), 0) + 1 FROM marca),
            true,
            null,
            DATE('now'),
            'Toyota'
        WHERE NOT EXISTS (SELECT nome FROM marca WHERE nome = 'Toyota');

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
            active BOOLEAN NOT NULL,
            updated_at TEXT,
            created_at TEXT NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            document VARCHAR(20) NOT NULL,
            contact VARCHAR(20),
            logged BOOLEAN,
            role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user'))
        );

        CREATE TABLE IF NOT EXISTS report
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            active BOOLEAN NOT NULL,
            created_at TEXT NOT NULL,
            link VARCHAR(150) NOT NULL,
            format VARCHAR(50) NOT NULL CHECK (format IN ('pdf', 'excel')),
            model VARCHAR(50) NOT NULL CHECK (model IN ('dailyMovimentations', 'monthlyMovimentations'))
        );
    `);
    db.close();
}