import AbstractEntity from "./abstract.entity";

export default class Configuracao extends AbstractEntity {
    private configuracao_id: Number;
    private configuracao_cadastro: Date;
    private configuracao_atualizacao: Date;
    private configuracao_ativo: boolean;
    private configuracao_nome: String;
    constructor(configuracao_id: Number, configuracao_cadastro: Date, configuracao_atualizacao: Date, configuracao_ativo: boolean, configuracao_nome: String) {
        super(configuracao_id, configuracao_cadastro, configuracao_atualizacao, configuracao_ativo);
        this.configuracao_id = configuracao_id;
        this.configuracao_cadastro = configuracao_cadastro;
        this.configuracao_atualizacao = configuracao_atualizacao;
        this.configuracao_ativo = configuracao_ativo;
        this.configuracao_nome = configuracao_nome;
    }
}