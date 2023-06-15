import AbstractEntity from "./abstract.entity";
import Marca from "./marca";

export default class Modelo extends AbstractEntity {
    private modelo_id: Number;
    private modelo_cadastro: Date;
    private modelo_atualizacao: Date;
    private modelo_ativo: boolean;
    
    private modelo_nome: String;
    private modelo_marca: Marca;
    constructor(modelo_id: Number, modelo_cadastro: Date, modelo_atualizacao: Date, modelo_ativo: boolean, modelo_nome: String, modelo_marca: Marca) {
        super(modelo_id, modelo_cadastro, modelo_atualizacao, modelo_ativo);
        this.modelo_id = modelo_id;
        this.modelo_cadastro = modelo_cadastro;
        this.modelo_atualizacao = modelo_atualizacao;
        this.modelo_ativo = modelo_ativo;
        this.modelo_nome = modelo_nome;
        this.modelo_marca = modelo_marca;
    }
}