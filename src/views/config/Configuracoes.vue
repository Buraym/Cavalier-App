<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { ConfiguracaoClient } from '@/client/configuracao.client';
import { format } from 'date-fns';

export default defineComponent({
    name: 'Configuracoes',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            vagasCarro: "0",
            vagasMoto: "0",
            vagasVan: "0",
            valorHora: "12.2",
            valorMinutoHora: "1.5",
            inicioExpediente: "0",
            fimExpediente: "0",
            gerarDesconto: true,
            tempoParaDesconto: "0",
            tempoDeDesconto: "0"
        }
    },
    mounted() {
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            const client = new ConfiguracaoClient();
            const config = await client.getConfig();
            this.vagasCarro = config.vagasCarro;
            this.vagasMoto = config.vagasMoto;
            this.vagasVan = config.vagasVan;
            this.valorHora = config.valorHora;
            this.valorMinutoHora = config.valorMinutoHora;
            this.inicioExpediente = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    config.inicioExpediente[0],
                    config.inicioExpediente[1],
                    config.inicioExpediente[2]
                ),
                "HH:mm:ss"
            );
            this.fimExpediente = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    config.fimExpediente[0],
                    config.fimExpediente[1],
                    config.fimExpediente[2]
                ),
                "HH:mm:ss"
            );
            this.gerarDesconto = config.gerarDesconto;
            this.tempoParaDesconto = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    config.tempoParaDesconto[0],
                    config.tempoParaDesconto[1],
                    config.tempoParaDesconto[2]
                ),
                "HH:mm:ss"
            );
            this.tempoDeDesconto = format(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    config.tempoDeDesconto[0],
                    config.tempoDeDesconto[1],
                    config.tempoDeDesconto[2]
                ),
                "HH:mm:ss"
            );
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            console.log({
                vagasCarro: this.vagasCarro,
                vagasMoto: this.vagasMoto,
                vagasVan: this.vagasVan,
                valorHora: this.valorHora,
                valorMinutoHora: this.valorMinutoHora,
                inicioExpediente: this.inicioExpediente,
                fimExpediente: this.fimExpediente,
                gerarDesconto: this.gerarDesconto,
                tempoParaDesconto: this.tempoParaDesconto,
                tempoDeDesconto: this.tempoDeDesconto
            })
            const client = new ConfiguracaoClient();
            const stringResult = await client.create({
                vagasCarro: this.vagasCarro,
                vagasMoto: this.vagasMoto,
                vagasVan: this.vagasVan,
                valorHora: this.valorHora,
                valorMinutoHora: this.valorMinutoHora,
                inicioExpediente: this.inicioExpediente,
                fimExpediente: this.fimExpediente,
                gerarDesconto: this.gerarDesconto,
                tempoParaDesconto: this.tempoParaDesconto,
                tempoDeDesconto: this.tempoDeDesconto
            });
        }
    }
});
</script>
<template>
    <div class="p-5">
        <form @submit="EnviarFormulario" class="container">
            <h4 class="text-start mb-3  mt-5">Configurações Gerais</h4>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="input-group m-0">
                    <span class="input-group-text">Quantidade de vagas para carro</span>
                    <input type="number" v-model="vagasCarro" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Quantidade de vagas para moto</span>
                    <input type="number" v-model="vagasMoto" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Quantidade de vagas para van</span>
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
                <div class="input-group m-0">
                    <span class="input-group-text">Inicio do expediente</span>
                    <input type="time" v-model="inicioExpediente" step="1" class="form-control"
                        aria-label="Inicio do expediente">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Fim do expediente</span>
                    <input type="time" v-model="fimExpediente" step="1" class="form-control" placeholder="Fim do expediente"
                        aria-label="Fim do expediente">
                </div>
            </div>
            <h4 class="text-start mb-3 mt-5">Configurações de descontos</h4>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-5 ">
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
            <button type="submit" class="btn btn-warning w-100">Atualizar</button>
        </form>
    </div>
</template>