import Modelo from "./modelo";

export default class Veiculo {
    private veiculo_id: String;
    private veiculo_placa: String;
    private veiculo_ano: Number;
    private veiculo_modelo: Modelo;
    private veiculo_cor: "RED" | "GREEN" | "BLUE";
    private veiculo_tipo: "CARRO" | "MOTO" | "VAN";
    constructor (veiculo_id: String, veiculo_placa: String, veiculo_ano: Number, veiculo_modelo: Modelo, veiculo_cor: "RED" | "GREEN" | "BLUE", veiculo_tipo: "CARRO" | "MOTO" | "VAN") {
        this.veiculo_id = veiculo_id;
        this.veiculo_placa = veiculo_placa;
        this.veiculo_ano = veiculo_ano;
        this.veiculo_modelo = veiculo_modelo;
        this.veiculo_cor = veiculo_cor;
        this.veiculo_tipo = veiculo_tipo;
    }
}