import Marca from "@/models/marca";
import axios, { AxiosInstance } from "axios"

export class MarcaClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8090/api/marca",
            headers: {
                "Access-Control-Allow-Origin": "*",
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
            return ( await this.axiosClient.get<any>(`/${id}`)).data;
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
            return (await this.axiosClient.put<any>(`/${id}`, marca)).data;
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