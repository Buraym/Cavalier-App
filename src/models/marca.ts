import AbstractEntity from "./abstract.entity";

export default class Marca extends AbstractEntity {
    private marca_id: Number;
    private marca_cadastro: Date;
    private marca_atualizacao: Date;
    private marca_ativo: boolean;
    private marca_nome: String;
    constructor(marca_id: Number, marca_cadastro: Date, marca_atualizacao: Date, marca_ativo: boolean, marca_nome: String) {
        super(marca_id, marca_cadastro, marca_atualizacao, marca_ativo);
        this.marca_id = marca_id;
        this.marca_cadastro = marca_cadastro;
        this.marca_atualizacao = marca_atualizacao;
        this.marca_ativo = marca_ativo;
        this.marca_nome = marca_nome;
    }
}