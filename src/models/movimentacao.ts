import AbstractEntity from "./abstract.entity";
import Veiculo from "./veiculo";
import Condutor from "./condutor";

export default class Movimentacao extends AbstractEntity {
    private movimentacao_id: Number;
    private movimentacao_cadastro: Date;
    private movimentacao_atualizacao: Date;
    private movimentacao_ativo: boolean;
    private movimentacao_veiculo: Veiculo;
    private movimentacao_condutor: Condutor;
    private movimentacao_entrada: Date;
    private movimentacao_saida: Date;
    private movimentacao_tempo: String;
    private movimentacao_tempo_desconto: String;
    private movimentacao_tempo_multa: String;
    private movimentacao_valor_desconto: Number;
    private movimentacao_valor_multa: Number;
    private movimentacao_valor_total: Number;
    private movimentacao_valor_hora: Number;

    constructor(movimentacao_id: Number, movimentacao_cadastro: Date, movimentacao_atualizacao: Date, movimentacao_ativo: boolean, movimentacao_veiculo: Veiculo, movimentacao_condutor: Condutor, movimentacao_entrada: Date, movimentacao_saida: Date, movimentacao_tempo: String, movimentacao_tempo_desconto: String, movimentacao_tempo_multa: String, movimentacao_valor_desconto: Number, movimentacao_valor_multa: Number, movimentacao_valor_total: Number, movimentacao_valor_hora: Number) {
        super(movimentacao_id, movimentacao_cadastro, movimentacao_atualizacao, movimentacao_ativo);
        this.movimentacao_id = movimentacao_id;
        this.movimentacao_cadastro = movimentacao_cadastro;
        this.movimentacao_atualizacao = movimentacao_atualizacao;
        this.movimentacao_ativo = movimentacao_ativo;
        this.movimentacao_ativo = movimentacao_ativo;
        this.movimentacao_veiculo = movimentacao_veiculo;
        this.movimentacao_condutor = movimentacao_condutor;
        this.movimentacao_entrada = movimentacao_entrada;
        this.movimentacao_saida = movimentacao_saida;
        this.movimentacao_tempo = movimentacao_tempo;
        this.movimentacao_tempo_desconto = movimentacao_tempo_desconto;
        this.movimentacao_tempo_multa = movimentacao_tempo_multa;
        this.movimentacao_valor_desconto = movimentacao_valor_desconto;
        this.movimentacao_valor_multa = movimentacao_valor_multa;
        this.movimentacao_valor_total = movimentacao_valor_total;
        this.movimentacao_valor_hora = movimentacao_valor_hora;
    }
}