import Modelo from "@/models/modelo";
import axios, { AxiosInstance } from "axios"

export class ModeloClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api/condutor",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<Modelo[] | []> {
        try {
            return ( await this.axiosClient.get<Modelo[] | []>(`/`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async findById(id: string) : Promise<Modelo> {
        try {
            return ( await this.axiosClient.get<Modelo>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async create(modelo: Modelo) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, modelo)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async editById(id: Number, modelo: Modelo) : Promise<Modelo> {
        try {
            return ( await this.axiosClient.put<Modelo>(`/${id}`, modelo)).data;
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