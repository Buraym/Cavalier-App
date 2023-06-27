import Movimentacao from "@/models/movimentacao";
import axios, { AxiosInstance } from "axios"

export class MovimentacaoClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8090/api/movimentacao",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<any[] | []> {
        try {
            return ( await this.axiosClient.get<Movimentacao[] | []>(`/lista`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async findById(id: string) : Promise<any> {
        try {
            return ( await this.axiosClient.get<any>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async create(movimentacao: any) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, movimentacao)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async editById(id: Number, movimentacao: any) : Promise<any> {
        try {
            return ( await this.axiosClient.put<any>(`/${id}`, movimentacao)).data;
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