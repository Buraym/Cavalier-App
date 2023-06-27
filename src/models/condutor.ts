import AbstractEntity from "./abstract.entity";

export default class Condutor extends AbstractEntity {
    public id: Number;
    public cadastro: Date;
    public atualizacao: Date;
    public ativo: boolean;

    public nome: String;
    public cpf: String;
    public telefone: String;
    public tempoGasto: Number;
    
    constructor(id: Number, cadastro: Date, atualizacao: Date, ativo: boolean, nome: String, cpf: String, telefone: String, tempoGasto: Number) {
        super(id, cadastro, atualizacao, ativo);
        this.id = id;
        this.cadastro = cadastro;
        this.atualizacao = atualizacao;
        this.ativo = ativo;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tempoGasto = tempoGasto;
    }
}