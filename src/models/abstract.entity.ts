export default interface IAbstract {
    id: Number,
    ativo: boolean,
    atualizacao: null | String | Date,
    cadastro: String | Date,
    criado_por: Number,
    atualizado_por: Number,
    deletado_por: Number,
}