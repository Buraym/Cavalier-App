<script lang="ts">
import { defineComponent, ref } from 'vue';
import { criar_movimentacao } from '@/controllers/movimentacao';
import { listar_veiculos } from '@/controllers/veiculo';
import { listar_condutores } from '@/controllers/condutor';
import { retornar_configuracao } from '@/controllers/configuracao';
import { format } from 'date-fns';
import { CalcTotalTime } from '@/utils';
const condutores = ref<any[] | []>([]);
const veiculos = ref<any[] | []>([]);
export default defineComponent({
    name: 'CadastroModelo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            condutor: null,
            condutores,
            veiculo: null,
            veiculos,
            config: null,
            entrada: format(new Date(), "yyyy-MM-dd HH:mm"),
            saida: "",
            tempo: "00:00",
            tempoDesconto: "00:00",
            tempoMulta: "00:00",
            valorDesconto: 0.00,
            valorMulta: 0.00,
            valorTotal: 0.00,
            valorHora: 0.00,
            valorHoraMulta: 0.00,
            calculoAutomatico: true
        }
    },
    mounted() {
        this.RetornarCondutores();
        this.RetornarVeiculos();
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            const config = await retornar_configuracao();
            this.config = config;
            this.valorHora = config.valor_hora;
            this.valorHoraMulta = config.valor_hora;
            this.valorHora = config.valor_hora;
        },
        async RetornarCondutores() {
            this.condutores = (await listar_condutores()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async RetornarVeiculos() {
            this.veiculos = (await listar_veiculos()).map((item) => ({ title: item.modelo.nome + " - " + item.placa, value: item.id }));
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            let customValues = {
                tempo: this.tempo,
                tempo_desconto: this.tempoDesconto,
                tempo_multa: this.tempoMulta,
                valor_desconto: this.valorDesconto,
                valor_multa: this.valorMulta,
                valor_total: this.valorTotal,
                valor_hora: this.valorHora,
                valor_hora_multa: this.valorHoraMulta,
                valor_minuto_hora: Number(this.valorHora / 60)
            }
            let data: any = {
                condutor_id: this.condutor,
                veiculo_id: this.veiculo,
                entrada: new Date(this.entrada),
                saida: null,
                tempo: 0,
                tempo_desconto: 0,
                tempo_multa: 0,
                valor_desconto: 0,
                valor_multa: 0,
                valor_total: 0,
                valor_hora: 0,
                valor_hora_multa: 0,
            }
            if (this.saida !== "") {
                let calculatedData = CalcTotalTime({
                    entrada: new Date(this.entrada),
                    saida: new Date(this.saida),
                }, this.calculoAutomatico ? this.config : null, this.calculoAutomatico ? null : customValues);
                data = {
                    condutor_id: this.condutor,
                    veiculo_id: this.veiculo,
                    entrada: new Date(this.entrada),
                    saida: new Date(this.saida),
                    tempo: calculatedData.tempo,
                    tempo_desconto: calculatedData.tempo_desconto,
                    tempo_multa: calculatedData.tempo_multa,
                    valor_desconto: calculatedData.valor_desconto,
                    valor_multa: calculatedData.valor_multa,
                    valor_total: calculatedData.valor_total,
                    valor_hora: calculatedData.valor_hora,
                    valor_hora_multa: calculatedData.valor_hora_multa,
                }
            }
            await criar_movimentacao(data);
            this.$router.push('/movimentacao');
        }
    }
});
</script>
<template>
    <div class="cadastro-movimentacao">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-start gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <h2 class="mb-0">Cadastro de Movimentação</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Condutor</label>
                        <select v-model="condutor" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma condutor</option>
                            <option v-for="(item) in condutores" :key="item.value" :value="item.value">{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Veiculo</label>
                        <select v-model="veiculo" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma veículo</option>
                            <option v-for="(item) in veiculos" :key="item.value" :value="item.value">{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Hora Entrada</span>
                            <input type="datetime-local" v-model="entrada" class="form-control" placeholder="Hora Entrada"
                                aria-label="Hora Entrada" aria-describedby="basic-addon1" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Hora Saída</span>
                            <input type="datetime-local" v-model="saida" class="form-control" placeholder="Hora Saída"
                                aria-label="Hora Saída" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo total decorrido</span>
                            <input type="time" v-model="tempo" class="form-control" placeholder="Tempo total decorrido"
                                aria-label="Tempo total decorrido" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo desconto</span>
                            <input type="time" v-model="tempoDesconto" class="form-control" placeholder="Tempo desconto"
                                aria-label="Tempo desconto" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo multa</span>
                            <input type="time" v-model="tempoMulta" class="form-control" placeholder="Tempo multa"
                                aria-label="Tempo multa" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div v-if="!calculoAutomatico" class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor desconto (R$)</span>
                            <input type="text" v-model="valorDesconto" class="form-control" placeholder="Valor desconto"
                                aria-label="Valor desconto" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor multa (R$)</span>
                            <input type="text" v-model="valorMulta" class="form-control" placeholder="Valor multa"
                                aria-label="Valor multa" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor da multa por hora (R$)</span>
                            <input type="text" v-model="valorHoraMulta" class="form-control" placeholder="Valor multa"
                                aria-label="Valor multa" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div v-if="!calculoAutomatico" class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor unitario por hora (R$)</span>
                            <input type="text" v-model="valorHora" class="form-control"
                                placeholder="Valor unitario por hora" aria-label="Valor unitario por hora"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor total (R$)</span>
                            <input type="text" v-model="valorTotal" class="form-control" placeholder="Valor total"
                                aria-label="Valor total" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2 mb-3">
                        <div class="form-check">
                            <input v-model="calculoAutomatico" class="form-check-input" type="checkbox"
                                id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Calculo automatico ?
                            </label>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">
                            Cadastrar movimentação
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cadastro-movimentacao {
    padding: 30px;
}

@media (max-width: 992px) {
    .cadastro-movimentacao {
        padding: 10px;
    }
}
</style>