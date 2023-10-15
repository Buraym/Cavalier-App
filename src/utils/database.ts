import { appDataDir, join, sep, BaseDirectory, appLocalDataDir } from '@tauri-apps/api/path'
import { writeTextFile, writeBinaryFile, exists, readTextFile } from '@tauri-apps/api/fs';
import SQLite from 'tauri-plugin-sqlite-api';
import { format } from 'date-fns';

// INICIA O BANCO SE JÁ NÃO TIVER INICIADO
export async function init_db() {
    const db = await SQLite.open('../src/db/cavalier.db');
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
            moeda VARCHAR(50) NOT NULL CHECK (moeda IN ('ars', 'brl', 'pyg', 'usd')),
            backup_since TEXT,
            backup_folder TEXT,
            uploading BOOLEAN,
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
            valor_minuto_hora,
            moeda,
            backup_since,
            backup_folder,
            uploading
        )
        SELECT 1, 1, NULL, DATE('now'), TIME('18:00:00'), 1, TIME('09:00:00'), TIME('01:00:00'), TIME('00:30:00'), 10, 5, 2, 15.50, 0.25, 'brl', NULL, NULL, NULL
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
            file_data TEXT NOT NULL,
            model VARCHAR(50) NOT NULL CHECK (model IN ('dailyMovimentations', 'monthlyMovimentations'))
        );
    `);
    await db.close();
}

export async function set_backup_folder(path: String) {
    const db = await SQLite.open('../src/db/cavalier.db');
    await db.execute("update configuracao SET backup_folder = ?1", [path]);
    await db.close();
}

export async function backup_db() {
    const db = await SQLite.open('../src/db/cavalier.db')
    const hasBackupFolderSet = await db.select<Array<any>>(
        "SELECT * FROM configuracao WHERE backup_folder IS NOT NULL & (uploading=NULL OR uploading=0) LIMIT 1"
    );
    if (hasBackupFolderSet.length > 0 && String(hasBackupFolderSet[0].backup_folder) !== "" && hasBackupFolderSet[0].backup_folder !== null) {
        const brands = await db.select<any[] | []>(
            "SELECT * FROM marca"
        )
        const models = await db.select<any[] | []>(
            "SELECT * FROM modelo"
        )
        const vehicles = await db.select<any[] | []>(
            "SELECT * FROM veiculo"
        )
        const drivers = await db.select<any[] | []>(
            "SELECT * FROM condutor"
        )
        const movimentation = await db.select<any[] | []>(
            "SELECT * FROM movimentacao"
        )
        const config = await db.select<any[] | []>(
            "SELECT * FROM configuracao"
        )
        const reports = await db.select<any[] | []>(
            "SELECT * FROM report"
        )
        let result:any = {
            brands,
            models,
            vehicles,
            drivers,
            movimentation,
            config,
            reports,
        };
        result =  JSON.stringify(result);
        let appDataDirPath: any = await join(String(hasBackupFolderSet[0].backup_folder), `CAVALIER_BACKUP_${new Date().valueOf()}.json`)
        await writeTextFile({ path: appDataDirPath, contents: result });
        const time = format(new Date(), "yyyy-MM-dd HH:mm:ss")
        await db.execute(
            "UPDATE configuracao SET backup_since = ?1",
            [String(time)]
        );
    }
}

export async function upload_backup_data(path: string) {
    const result = await readTextFile(path);
    const { brands, config, drivers, models, movimentation, reports, vehicles } = JSON.parse(result);
    const db = await SQLite.open('../src/db/cavalier.db');
    
    // LIMPA O BANCO DE DADOS | MARCAS
    await db.execute(`
        DELETE FROM marca;
    `);

    // LIMPA O BANCO DE DADOS | MODELOS
    await db.execute(`
        DELETE FROM modelo;
    `);

    // LIMPA O BANCO DE DADOS | VEICULOS
    await db.execute(`
        DELETE FROM veiculo;
    `);

    // LIMPA O BANCO DE DADOS | CONDUTORES
    await db.execute(`
        DELETE FROM condutor;
    `);

    // LIMPA O BANCO DE DADOS | MOVIMENTACOES
    await db.execute(`
        DELETE FROM movimentacao;
    `);

    // LIMPA O BANCO DE DADOS | REPORTES
    await db.execute(`
        DELETE FROM report;
    `);

    // DERRUBA A TABELA DE CONFIGURACAO
    await db.execute(`
        DROP TABLE configuracao;
    `);

    // CRIA A TABELA DE CONFIGURACAO
    await db.execute(`
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
             moeda VARCHAR(50) NOT NULL CHECK (moeda IN ('ars', 'brl', 'pyg', 'usd')),
             backup_since TEXT,
             backup_folder TEXT,
             uploading BOOLEAN,
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
    `);

    if (config.length === 1) {
        // INSERE A CONFIG
        await db.execute(`
            INSERT INTO configuracao ( ${Object.keys(config[0]).join(", ")} )
            VALUES ( ${Object.keys(config[0]).map((_: any, index: any) => "?" + String(Number(index) + 1))} );
            `, Object.keys(config[0]).map((key) => config[0][key] ));
    }

    if (brands.length > 0) {
        // INSERE AS MARCAS
        const new_brands = brands.map((brand: { nome: any; }) => {
            return [true, null, new Date(), brand.nome]
        })
        await db.execute(`
            INSERT INTO marca (ativo, atualizacao, cadastro, nome)
            VALUES (?1, ?2, ?3, ?4)
        `, new_brands);
    }

    if (models.length > 0) {
        // INSERE OS MODELOS
        const inserted_brands = await db.select<Array<any>>(`
            SELECT * FROM marca;
        `);
        const new_models = models.map((model: { nome: any; marca_id: any; }) => {
            let old_brand = brands.filter((brand: { id: any; }) => brand.id === model.marca_id)[0];
            const model_brand = inserted_brands.filter((brand) => String(brand.nome) === String(old_brand.nome))[0]
            return [true, null, new Date(), model.nome, model_brand.id]
        });
        await db.execute(`
            INSERT INTO modelo (ativo, atualizacao, cadastro, nome, marca_id)
            VALUES (?1, ?2, ?3, ?4, ?5)
        `, new_models);
    }

    if (vehicles.length > 0) {
        // INSERE OS VEICULOS
        const inserted_models = await db.select<Array<any>>(`
        SELECT * FROM modelo;
        `);
        const new_vehicles = vehicles.map((vehicle: { nome: any; marca_id: any; ano: any; cor: any; placa: any; tipo: any; modelo_id:  any; }) => {
        let old_model = models.filter((model: { id: any; }) => model.id === vehicle.modelo_id)[0];
        const vehicle_model = inserted_models.filter((model) => String(model.nome) === String(old_model.nome))[0]
        return [true, null, new Date(), vehicle.ano, vehicle.cor, vehicle.placa, vehicle.tipo, vehicle_model.id];
        })
        await db.execute(`
        INSERT INTO veiculo (ativo, atualizacao, cadastro, ano, cor, placa, tipo, modelo_id)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);
        `, new_vehicles);
    }
    
    if (drivers.length > 0) {
        // INSERE OS CONDUTORES
        const new_drivers = drivers.map((driver: { cpf: any; nome: any; telefone: any; }) => {
            return [true, null, new Date(), driver.cpf, driver.nome, driver.telefone];
        })
        await db.execute(`
            INSERT INTO condutor ( ativo, atualizacao, cadastro, cpf, nome, telefone, tempo_gasto )
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0);
        `, new_drivers);
    }

    if (movimentation.length > 0) {
        // INSERE AS  MOVIMENTACOES
        const inserted_vehicles = await db.select<Array<any>>(`
            SELECT * FROM veiculo;
        `);
        const inserted_drivers = await db.select<Array<any>>(`
            SELECT * FROM condutor;
        `);
        const new_movimentations = movimentation.map(
            (
                mov: {
                    condutor_id: any;
                    veiculo_id: any;
                    entrada: any;
                    saida: any;
                    tempo: any;
                    tempo_desconto: any;
                    tempo_multa: any;
                    valor_desconto: any;
                    valor_hora: any;
                    valor_hora_multa: any;
                    valor_multa: any;
                    valor_total: any;
                }
            ) => {
            
            let old_driver = drivers.filter((driver: { id: any; condutor_id: any; }) => driver.id === mov.condutor_id)[0];
            const movimentation_driver = inserted_drivers.filter((driver) => String(driver.cpf) === String(old_driver.cpf))[0]
            let old_vehicle = vehicles.filter((vehicle: { id: any; }) => vehicle.id === mov.veiculo_id)[0];
            const movimentation_vehicle = inserted_vehicles.filter((vehicle) => String(vehicle.placa) === String(old_vehicle.placa))[0]

            return [
                true,
                null,
                new Date(),
                mov.entrada,
                mov.saida,
                mov.tempo,
                mov.tempo_desconto,
                mov.tempo_multa,
                mov.valor_desconto,
                mov.valor_hora,
                mov.valor_hora_multa,
                mov.valor_multa,
                mov.valor_total,
                movimentation_driver.id,
                movimentation_vehicle.id
            ];
        });
        await db.execute(`
            INSERT INTO movimentacao (ativo, atualizacao, cadastro, entrada, saida, tempo, tempo_desconto,
            tempo_multa, valor_desconto, valor_hora, valor_hora_multa, valor_multa, valor_total, condutor_id, veiculo_id)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15);
        `, new_movimentations);
    }

    if (reports.length > 0) {
        // INSERE OS REPORTES
        const new_reports = reports.map((report: { link: any; format: any; model: any; file_data: any; }) => {
            return [true, new Date(), report.link, report.format, report.model, report.file_data];
        })
        await db.execute(`
            INSERT INTO report (active, created_at, link, format, model, file_data)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6)
        `, new_reports);
    }
}