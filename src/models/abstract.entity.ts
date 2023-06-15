export default class AbstractEntity {
    public id: Number;
    public cadastro: Date;
    public atualizacao: Date;
    public ativo: boolean;
    constructor(id: Number, cadastro: Date, atualizacao: Date, ativo: boolean) {
        this.id = id;
        this.cadastro = cadastro;
        this.atualizacao = atualizacao;
        this.ativo = ativo;
    }
}