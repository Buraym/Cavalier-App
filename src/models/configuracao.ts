import IAbstract from "./abstract.entity";

export default interface IConfiguracao extends IAbstract {
    entrada: String,
    saida: String | null,
    tempo: Number | null,
    tempo_desconto: Number | null,
    tempo_multa: Number | null,
    valor_desconto: Number | null,
    valor_hora: Number | null,
    valor_hora_multa: Number | null,
    valor_multa: Number | null,
    valor_total: Number | null,
    condutor_id: Number,
    veiculo_id: Number,
}