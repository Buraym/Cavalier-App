import Veiculo from "@/models/veiculo";
import axios, { AxiosInstance } from "axios"

export class EspecialidadeClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            // baseURL: "http://localhost:8080",
            baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() {
        return await this.axiosClient.get("/search.php?f=a").then((result) => result.data).catch((err) => {
            console.log("Deu erro ao pegar a lista !!!", err);
        });
        // await this.axiosClient.get("/especialidades").then((result) => result).catch((err) => {
        //     console.log("Deu erro ao pegar a lista !!!", err);
        // });
    }

    private async findById(id: string) {
        await this.axiosClient.get("/especialidades", { params: {
            id
        } }).then((result) => result).catch((err) => {
            console.log("Deu erro ao achar por ID !!!", err);
        });
    }

    private async create(veiculo: Veiculo) {
        await this.axiosClient.post("/especialidades", { veiculo }).then((result) => result).catch((err) => {
            console.log("Deu erro ao criar !!!", err);
        });
    }

    private async editById(id: Number, veiculo: Veiculo) {
        await this.axiosClient.put("/especialidades", { veiculo, id }).then((result) => result).catch((err) => {
            console.log("Deu erro ao editar !!!", err);
        });
    }

    private async deleteById(id: string) {
        await this.axiosClient.delete("/especialidades", { params: { id } }).then((result) => result).catch((err) => {
            console.log("Deu erro ao deletar !!!", err);
        }); 
    }
}