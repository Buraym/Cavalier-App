import Marca from "@/models/marca";
import axios, { AxiosInstance } from "axios"

export class MarcaClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api/condutor",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<Marca[] | []> {
        try {
            return ( await this.axiosClient.get<Marca[] | []>(`/`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async findById(id: string) : Promise<Marca> {
        try {
            return ( await this.axiosClient.get<Marca>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async create(marca: Marca) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, marca)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async editById(id: Number, marca: Marca) : Promise<Marca> {
        try {
            return ( await this.axiosClient.put<Marca>(`/${id}`, marca)).data;
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