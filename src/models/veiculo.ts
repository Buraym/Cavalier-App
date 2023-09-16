import IAbstract from "./abstract.entity";

export enum EVeiculoCor {
    "BLUE",
    "RED",
    "GREEN",
    "WHITE",
    "GREY",
    "SILVER",
    "BLACK",
    "PURPLE",
    "ORANGE",
    "OTHER"
}

export enum EVeiculoTipo {
    "CARRO",
    "MOTO",
    "VAN"
}

export default interface IVeiculo extends IAbstract {
    ano: Number,
    cor: EVeiculoCor,
    placa: String,
    tipo: EVeiculoTipo,
    modelo_id: Number,
}