import Modelo from "@/models/modelo";
import axios, { AxiosInstance } from "axios"

export class ModeloClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8090/api/modelo",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<any[] | []> {
        try {
            return ( await this.axiosClient.get<any[] | []>(`/lista`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async findById(id: string) : Promise<any> {
        try {
            return ( await this.axiosClient.get<Modelo>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async create(modelo: any) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, modelo)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async editById(id: Number, modelo: any) : Promise<any> {
        try {
            return ( await this.axiosClient.put<Modelo>(`/${id}`, modelo)).data;
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