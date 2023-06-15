import Movimentacao from "@/models/movimentacao";
import axios, { AxiosInstance } from "axios"

export class VeiculoClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api/veiculo",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<Movimentacao[] | []> {
        try {
            return ( await this.axiosClient.get<Movimentacao[] | []>(`/`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async findById(id: string) : Promise<Movimentacao> {
        try {
            return ( await this.axiosClient.get<Movimentacao>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async create(movimentacao: Movimentacao) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, movimentacao)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async editById(id: Number, movimentacao: Movimentacao) : Promise<Movimentacao> {
        try {
            return ( await this.axiosClient.put<Movimentacao>(`/${id}`, movimentacao)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async deleteById(id: string) : Promise<string> {
        try {
            return ( await this.axiosClient.delete<string>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        } 
    }
}