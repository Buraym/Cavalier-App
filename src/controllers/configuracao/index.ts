import SQLite from 'tauri-plugin-sqlite-api';

// CONFIGURACOES
// RETORNAR CONFIGURACAO
export async function retornar_configuracao() {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT *
        FROM configuracao
        LIMIT 1;
    `);
    
    return result[0];
}

// CRIAR CONFIGURACAO
export async function criar_configuracao(configuracao: any) {
    const db = await SQLite.open('./cavalier.db');
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
    const db = await SQLite.open('./cavalier.db');
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