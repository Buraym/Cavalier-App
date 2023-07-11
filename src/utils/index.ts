import { intervalToDuration, isAfter, isBefore } from "date-fns";

export function CalcTotalTime(movimentation: any, config: any, custom_values: any) {
    // Inicia com zero
    let total_value = 0;
    // Se maior que uma hora e perfeitamente divisivel por 60, entra nesse
    if (movimentation.tempo >= 60 && movimentation.tempo % 60 === 0) {
        total_value +=  custom_values.valorHora ? movimentation.tempo * custom_values.valorHora : movimentation.tempo * config.valorHora;
    // Se maior que uma hora, porem, tem restante da divisão por 60, entra nesse
    } else if (movimentation.tempo >= 60 && movimentation.tempo % 60 !== 0) {
        total_value += (Math.floor(Number(movimentation.tempo / 60)) * config.valorHora) + (Number(movimentation.tempo % 60) * config.valorMinutoHora);
    // Se menor que uma hora, entra nesse
    } else {
        total_value +=  custom_values.valorMinutoHora ? movimentation.tempo * custom_values.valorMinutoHora : movimentation.tempo * config.valorMinutoHora;
    }

    // Checa se tem desconto, ou seja, se é maior que o tempo de desconto e permite desconto
    const duracao = intervalToDuration({
        start: new Date(
            movimentation.entrada[0],
            movimentation.entrada[1],
            movimentation.entrada[2],
            movimentation.entrada[3],
            movimentation.entrada[4],
            movimentation.entrada[5],
        ),
        end: new Date(
            movimentation.saida[0],
            movimentation.saida[1],
            movimentation.saida[2],
            movimentation.saida[3],
            movimentation.saida[4],
            movimentation.saida[5],
        )
    });
    let duracao_total = (Number(duracao.hours) * 3600) + (Number(duracao.minutes) * 60) + Number(duracao.seconds);
    let duracao_desconto_total = (Number(config.tempoParaDesconto[0]) * 3600) + (Number(config.tempoParaDesconto[1]) * 60) + Number(config.tempoParaDesconto[2]);
    if (duracao_total > duracao_desconto_total && config.gerarDesconto) {
        let diferenca_duracao = Number(duracao_total) - Number(duracao_desconto_total);
        total_value += (diferenca_duracao / 60) * config.valorMinutoHora;
    }

    // Checa se tem desconto, ou seja, se é maior que o tempo de desconto e permite desconto
    let startMoment = new Date(movimentation.entrada[0],movimentation.entrada[1],movimentation.entrada[2],movimentation.entrada[3],movimentation.entrada[4],movimentation.entrada[5]);
    let endMoment = new Date(movimentation.saida[0],movimentation.saida[1],movimentation.saida[2],movimentation.saida[3],movimentation.saida[4],movimentation.saida[5])

    let begginingShift = new Date(movimentation.entrada[0],movimentation.entrada[1],movimentation.entrada[2], config.inicioExpediente[0],config.inicioExpediente[1],config.inicioExpediente[2])
    let endShift = new Date(movimentation.saida[0],movimentation.saida[1],movimentation.saida[2], config.fimExpediente[0],config.fimExpediente[1],config.fimExpediente[2])
    if (isAfter(begginingShift, startMoment)) {
        let intervalBefore = intervalToDuration({
            start: startMoment,
            end: begginingShift,
        })
        let duration_beggining_shift = (Number(intervalBefore.hours) * 3600) + (Number(intervalBefore.minutes) * 60) + Number(duracao.seconds);
        total_value += (duration_beggining_shift / 60) * config.valorMinutoHora;
    }
    if (isBefore(endShift, endMoment)) {
        let intervalBefore = intervalToDuration({
            start: endShift,
            end: endMoment,
        })
        let duration_beggining_shift = (Number(intervalBefore.hours) * 3600) + (Number(intervalBefore.minutes) * 60) + Number(duracao.seconds);
        total_value += (duration_beggining_shift / 60) * config.valorMinutoHora;
    }



    return Number(total_value).toFixed(2);
}

export function IntToTime(time: Number): String {
    return Number(time) < 1 ?
                    "00:00" :
                    String(Math.floor(Number(time) / 60) < 10 ? "0" + String(Math.floor(Number(time) / 60)) : String(Math.floor(Number(time) / 60))) +
                    ":" +
                    String(Math.floor(Number(time) % 60) < 10 ? "0" + String(Math.floor(Number(time) % 60)) : String(Math.floor(Number(time) % 60)))
}

export function StringToTime(time: String): Number {
    return Number(String(time).split(":")[0]) * 60 + Number(String(time).split(":")[1]);
}

export function StringToDate(time: String): Date {
    const date = new Date(String(time));
    date.setUTCHours(Number(date.getHours()));
    return date;
}