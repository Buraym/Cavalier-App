import axios from "axios";

export interface IConfig {
    type: "daily" | "monthly" | "annual" | "custom";
    format: "pdf" | "xlsx";
}

export async function GenerateServerReport(config: IConfig, report: any) {
    const response = await axios.post("http://localhost:3000/reports", {
        config,
        report
    });
    return response.data;
}