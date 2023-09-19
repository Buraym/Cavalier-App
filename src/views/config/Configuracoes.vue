<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { retornar_configuracao } from '@/controllers/configuracao';

export default defineComponent({
    name: 'Configuracoes',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            vagasCarro: "10",
            vagasMoto: "5",
            vagasVan: "2",
            valorHora: 12.2,
            valorMinutoHora: 1.5,
            inicioExpediente: "09:00:00",
            fimExpediente: "18:00:00",
            gerarDesconto: true,
            tempoParaDesconto: "00:30:00",
            tempoDeDesconto: "01:00:00",
            ativo: true,
        }
    },
    mounted() {
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            const configuracao = await retornar_configuracao();
            console.log(configuracao);
            this.vagasCarro = String(configuracao.vagas_carro);
            this.vagasMoto = String(configuracao.vagas_moto);
            this.vagasVan = String(configuracao.vagas_van);
            this.valorHora = configuracao.valor_hora;
            this.valorMinutoHora = configuracao.valor_minuto_hora;
            this.inicioExpediente = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    Number(String(configuracao.inicio_expediente).split(":")[0]),
                    Number(String(configuracao.inicio_expediente).split(":")[1]),
                    Number(String(configuracao.inicio_expediente).split(":")[1]),
                ),
                "HH:mm:ss"
            );
            this.fimExpediente = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    Number(String(configuracao.fim_expediente).split(":")[0]),
                    Number(String(configuracao.fim_expediente).split(":")[1]),
                    Number(String(configuracao.fim_expediente).split(":")[1]),
                ),
                "HH:mm:ss"
            );
            this.gerarDesconto = configuracao.gerar_desconto ? true : false;
            this.tempoParaDesconto = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    Number(String(configuracao.tempo_para_desconto).split(":")[0]),
                    Number(String(configuracao.tempo_para_desconto).split(":")[1]),
                    Number(String(configuracao.tempo_para_desconto).split(":")[1]),
                ),
                "HH:mm:ss"
            );
            this.tempoDeDesconto = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    Number(String(configuracao.tempo_de_desconto).split(":")[0]),
                    Number(String(configuracao.tempo_de_desconto).split(":")[1]),
                    Number(String(configuracao.tempo_de_desconto).split(":")[1])
                ),
                "HH:mm:ss"
            );
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            console.log({
                ativo: this.ativo,
                vagas_carro: this.vagasCarro,
                vagas_moto: this.vagasMoto,
                vagas_van: this.vagasVan,
                valor_hora: this.valorHora,
                valor_minuto_hora: this.valorMinutoHora,
                inicio_expediente: this.inicioExpediente,
                fim_expediente: this.fimExpediente,
                gerar_desconto: this.gerarDesconto,
                tempo_para_desconto: this.tempoParaDesconto,
                tempo_de_desconto: this.tempoDeDesconto
            })
            // await editar_configuracao({
            //     vagas_carro: this.vagasCarro,
            //     vagas_moto: this.vagasMoto,
            //     vagas_van: this.vagasVan,
            //     valor_hora: this.valorHora,
            //     valor_minuto_hora: this.valorMinutoHora,
            //     inicio_expediente: this.inicioExpediente,
            //     fim_expediente: this.fimExpediente,
            //     gerar_desconto: this.gerarDesconto,
            //     tempo_para_desconto: this.tempoParaDesconto,
            //     tempo_de_desconto: this.tempoDeDesconto
            // });
            // this.$router.push("/");
        }
    }
});
</script>
<template>
    <div class="px-5">
        <form @submit="EnviarFormulario" class="container">
            <h4 class="text-start mb-3  mt-5">Configurações Gerais</h4>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="input-group m-0">
                    <span class="input-group-text">QTD. de vagas para carros</span>
                    <input type="number" v-model="vagasCarro" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">QTD. de vagas para motos</span>
                    <input type="number" v-model="vagasMoto" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">QTD. de vagas para vans</span>
                    <input type="number" v-model="vagasVan" class="form-control">
                </div>
            </div>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="input-group m-0">
                    <span class="input-group-text">Valor da Hora (R$)</span>
                    <input type="number" v-model="valorHora" step="0.01" class="form-control" placeholder="Valor da Hora"
                        aria-label="Valor Hora">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Valor do Minuto (R$)</span>
                    <input type="number" v-model="valorMinutoHora" step="0.01" class="form-control"
                        placeholder="Valor do Minuto" aria-label="Valor Minuto">
                </div>
                <!-- <div class="input-group m-0">
                    <span class="input-group-text">Inicio do expediente</span>
                    <input type="time" v-model="inicioExpediente" step="1" class="form-control"
                        aria-label="Inicio do expediente">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Fim do expediente</span>
                    <input type="time" v-model="fimExpediente" step="1" class="form-control" placeholder="Fim do expediente"
                        aria-label="Fim do expediente">
                </div> -->
            </div>
            <!-- <h4 class="text-start mb-3 mt-5">Configurações de descontos</h4>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="form-check">
                    <input class="form-check-input form-check-input-warning" v-model="gerarDesconto" type="checkbox"
                        value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Descontar
                    </label>
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Tempo Minimo de desconto</span>
                    <input type="time" v-model="tempoParaDesconto" step="1" class="form-control"
                        placeholder="Tempo Minimo de desconto" aria-label="Tempo Minimo de desconto">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Tempo de desconto</span>
                    <input type="time" v-model="tempoDeDesconto" step="1" class="form-control"
                        placeholder="Tempo Minimo de desconto" aria-label="Tempo Minimo de desconto">
                </div>
            </div>
            <div class="d-flex w-100 align-items-center justify-content-start gap-3 mb-5">
                <div class="form-check">
                    <input class="form-check-input form-check-input-warning" v-model="ativo" type="checkbox"
                        id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Configuração automatica de preços e horarios ativa ?
                    </label>
                </div>

            </div> -->
            <button type="submit" class="btn btn-warning w-100">Atualizar</button>
        </form>
    </div>
</template>