import Configuracao from "@/models/configuracao";
import axios, { AxiosInstance } from "axios"

export class ConfiguracaoClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8090/api/configuracao",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })   
    }

    public async getConfig() : Promise<any> {
        try {
            return ( await this.axiosClient.get<any>(`/52`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async create(marca: any) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, marca)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async editById(id: Number, marca: any) : Promise<any> {
        try {
            return ( await this.axiosClient.put<any>(`/${id}`, marca)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async deleteById(id: string) : Promise<string> {
        try {
            return ( await this.axiosClient.delete<string>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        } 
    }
}