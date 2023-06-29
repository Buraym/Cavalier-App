<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CondutorClient } from '@/client/condutor.client';
import { VeiculoClient } from '@/client/veiculo.client';
import { MovimentacaoClient } from '@/client/movimentacoes.client';
import { ConfiguracaoClient } from '@/client/configuracao.client';
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
            entrada: "",
            saida: "",
            tempo: "",
            tempoDesconto: "",
            tempoMulta: "",
            valorDesconto: 0.00,
            valorMulta: 0.00,
            valorTotal: 0.00,
            valorHora: 0.00,
            valorHoraMulta: 0.00
        }
    },
    mounted() {
        this.RetornarCondutores();
        this.RetornarVeiculos();
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            const configuracaoClient = new ConfiguracaoClient();
            this.config = (await configuracaoClient.getConfig());
        },
        async RetornarCondutores() {
            const client = new CondutorClient();
            this.condutores = (await client.getList()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async RetornarVeiculos() {
            const client = new VeiculoClient();
            this.veiculos = (await client.getList()).map((item) => ({ title: item.modelo.nome + " - " + item.placa, value: item.id }));
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            const client = new MovimentacaoClient();
            const condutorClient = new CondutorClient();
            const veiculoClient = new VeiculoClient();
            const condutor = await condutorClient.findById(String(this.condutor));
            const veiculo = await veiculoClient.findById(String(this.veiculo));
            await client.create({
                condutor,
                veiculo,
                entrada: this.entrada,
                saida: this.saida,
                tempo: Number(String(this.tempo).split(":")[0]) * 60 + Number(String(this.tempo).split(":")[1]),
                tempoDesconto: Number(String(this.tempoDesconto).split(":")[0]) * 60 + Number(String(this.tempoDesconto).split(":")[1]),
                tempoMulta: Number(String(this.tempoMulta).split(":")[0]) * 60 + Number(String(this.tempoMulta).split(":")[1]),
                valorDesconto: Number(Math.abs(Number(this.valorDesconto)).toFixed(2)),
                valorMulta: Number(Math.abs(Number(this.valorMulta)).toFixed(2)),
                valorTotal: Number(Math.abs(Number(this.valorTotal)).toFixed(2)),
                valorHora: Number(Math.abs(Number(this.valorHora)).toFixed(2)),
                valorHoraMulta: Number(Math.abs(Number(this.valorHoraMulta)).toFixed(2)),
            });
            this.$router.push('/movimentacao');
        }
    }
});
</script>
<template>
    <div class="cadastro-modelo">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Movimentação</h2>
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
                                aria-label="Hora Entrada" aria-describedby="basic-addon1">
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
                    <div class="d-flex align-items-center justify-content-center gap-2">
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
                    <div class="d-flex align-items-center justify-content-center gap-2">
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
.cadastro-marca {
    padding: 30px;
}
</style>