import AbstractEntity from "./abstract.entity";

export default class Condutor extends AbstractEntity {
    private condutor_id: Number;
    private condutor_cadastro: Date;
    private condutor_atualizacao: Date;
    private condutor_ativo: boolean;

    private condutor_nome: String;
    private condutor_cpf: String;
    private condutor_telefone: String;
    private condutor_tempo_pago: String;
    private condutor_tempo_desconto: String;
    
    constructor(condutor_id: Number, condutor_cadastro: Date, condutor_atualizacao: Date, condutor_ativo: boolean, condutor_nome: String, condutor_cpf: String, condutor_telefone: String, condutor_tempo_pago: String, condutor_tempo_desconto: String) {
        super(condutor_id, condutor_cadastro, condutor_atualizacao, condutor_ativo);
        this.condutor_id = condutor_id;
        this.condutor_cadastro = condutor_cadastro;
        this.condutor_atualizacao = condutor_atualizacao;
        this.condutor_ativo = condutor_ativo;
        this.condutor_nome = condutor_nome;
        this.condutor_cpf = condutor_cpf;
        this.condutor_telefone = condutor_telefone;
        this.condutor_tempo_pago = condutor_tempo_pago;
        this.condutor_tempo_desconto = condutor_tempo_desconto;
    }
}