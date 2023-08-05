import IAbstract from "./abstract.entity";

export default interface ICondutor extends IAbstract {
    cpf: String,
    nome: String,
    telefone: String,
    tempo_gasto: Number
}