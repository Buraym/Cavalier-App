import { intervalToDuration, isAfter, isBefore } from "date-fns";

export function StringToTime(time: String): Number {
    return Number(String(time).split(":")[0]) * 60 + Number(String(time).split(":")[1]);
}

export function CalcTotalTime(movimentation: any, config: any, custom_values: any) {
    console.log()
    let result = {
        tempo: custom_values?.tempo ? StringToTime(custom_values?.tempo) : 0,
        tempo_desconto: custom_values?.tempo_desconto ? StringToTime(custom_values?.tempo_desconto) : 0,
        tempo_multa: custom_values?.tempo_multa ? StringToTime(custom_values?.tempo_multa) : 0,
        valor_desconto: custom_values?.valor_desconto ? custom_values?.valor_desconto : 0.00,
        valor_multa: custom_values?.valor_multa ? custom_values?.valor_multa : 0.00,
        valor_total: custom_values?.valor_total ? custom_values?.valor_total : 0.00,
        valor_hora: custom_values?.valor_hora ? custom_values?.valor_hora : config.valor_hora,
        valor_hora_multa: custom_values?.valor_hora_multa ? custom_values?.valor_hora_multa : 0.00,
        valor_minuto_hora: custom_values?.valor_minuto_hora ? custom_values.valor_minuto_hora : config.valor_minuto_hora,
    };
    let duration = intervalToDuration({
        start: new Date(movimentation.entrada),
        end: new Date(movimentation.saida)
    });
    result.tempo = (Number(duration.days) * 24 * 60 ) +
                    (Number(duration.hours) * 60) +
                        Number(duration.minutes);

    result.valor_desconto = custom_values?.valor_desconto !== undefined ?
                    Number(custom_values?.valor_desconto) :
                        config.gerar_desconto ? Number(result.tempo_desconto) * Number(config.valor_minuto_hora) : 0.00;
    
    result.valor_multa = custom_values?.valor_multa !== undefined ?
                        Number(custom_values?.valor_multa) :
                            Number(result.tempo_multa) * Number(config.valor_minuto_hora)

    result.valor_total = Number(Number(Math.floor(Number(result.tempo) / 60)) * Number(result.valor_hora));
    result.valor_total += Number(Number(Math.floor(Number(result.tempo) % 60)) * Number(result.valor_minuto_hora))
    result.valor_total += Number(result.valor_desconto)
    result.valor_total += Number(result.valor_multa)
    return result;
}

export function IntToTime(time: Number): String {
    return Number(time) < 1 ?
                    "00:00" :
                    String(Math.floor(Number(time) / 60) < 10 ? "0" + String(Math.floor(Number(time) / 60)) : String(Math.floor(Number(time) / 60))) +
                    ":" +
                    String(Math.floor(Number(time) % 60) < 10 ? "0" + String(Math.floor(Number(time) % 60)) : String(Math.floor(Number(time) % 60)))
}

export function StringToDate(time: String): Date {
    const date = new Date(String(time));
    date.setUTCHours(Number(date.getHours()) + 3);
    date.setUTCDate(Number(date.getDate()));
    return date;
}