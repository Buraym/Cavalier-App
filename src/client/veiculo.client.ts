import Veiculo from "@/models/veiculo";
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

    public async getList() : Promise<Veiculo[] | []> {
        try {
            return ( await this.axiosClient.get<Veiculo[] | []>(`/`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async findById(id: string) : Promise<Veiculo> {
        try {
            return ( await this.axiosClient.get<Veiculo>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async create(veiculo: Veiculo) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, veiculo)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async editById(id: Number, veiculo: Veiculo) : Promise<Veiculo> {
        try {
            return ( await this.axiosClient.put<Veiculo>(`/${id}`, veiculo)).data;
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