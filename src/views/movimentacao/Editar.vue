<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
import { IntToTime, StringToDate } from '../../utils/index';
import { retornar_movimentacao, editar_movimentacao, deletar_movimentacao } from '@/controllers/movimentacao';
import { listar_veiculos } from '@/controllers/veiculo';
import { listar_condutores } from '@/controllers/condutor';
const condutores = ref<any[] | []>([]);
const veiculos = ref<any[] | []>([]);
export default defineComponent({
    name: 'EdicaoMovimentacao',
    data: () => {
        return {
            ativo: true,
            condutor: null,
            condutores,
            veiculo: null,
            veiculos,
            entrada: "",
            saida: "",
            tempo: '',
            tempoDesconto: "",
            tempoMulta: "",
            valorDesconto: "",
            valorMulta: "",
            valorTotal: "",
            valorHora: "",
            valorHoraMulta: "",
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarVeiculos();
        this.RetornarCondutores();
        this.RetornarMovimentacao();
    },
    methods: {
        async RetornarCondutores() {
            this.condutores = (await listar_condutores()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async RetornarVeiculos() {
            this.veiculos = (await listar_veiculos()).map((item) => ({ title: item.modelo.nome + " - " + item.placa, value: item.id }));
            console.log(this.veiculos);
        },
        async RetornarMovimentacao() {
            const data = await retornar_movimentacao(String(this.$route.params.movimentacao_id))
            console.log(data);
            this.condutor = data.condutor.id;
            this.veiculo = data.veiculo.id;
            this.entrada = format(new Date(data.entrada), "yyyy-MM-dd HH:mm");
            this.saida = data.saida ? format(new Date(data.saida), "yyyy-MM-dd HH:mm") : "";
            this.tempo = String(IntToTime(data.tempo));
            this.tempoDesconto = String(IntToTime(data.tempo_desconto));
            this.tempoMulta = String(IntToTime(data.tempo_multa));
            this.valorDesconto = String(data.valor_desconto);
            this.valorHora = String(data.valor_hora);
            this.valorMulta = String(data.valor_multa);
            this.valorTotal = String(data.valor_total);
            this.valorHoraMulta = String(data.valor_hora_multa);
            this.ativo = data.ativo ? true : false;
            this.data_cadastro = format(new Date(data.cadastro), "dd/MM/yyyy HH:mm")
            if (data.atualizacao) {
                this.data_atualizado = format(new Date(data.atualizacao), "dd/MM/yyyy HH:mm")
            }
        },
        async EditarMovimentacao(event: any) {
            event.preventDefault();
            const data = await retornar_movimentacao(String(this.$route.params.movimentacao_id))
            await editar_movimentacao(String(this.$route.params.movimentacao_id), {
                ...data,
                condutor_id: this.condutor,
                veiculo_id: this.veiculo,
                entrada: StringToDate(this.entrada),
                saida: StringToDate(this.saida),
                ativo: this.ativo,
                tempo: Number(String(this.tempo).split(":")[0]) * 60 + Number(String(this.tempo).split(":")[1]),
                tempo_desconto: Number(String(this.tempoDesconto).split(":")[0]) * 60 + Number(String(this.tempoDesconto).split(":")[1]),
                tempo_multa: Number(String(this.tempoMulta).split(":")[0]) * 60 + Number(String(this.tempoMulta).split(":")[1]),
                valor_desconto: Number(Math.abs(Number(this.valorDesconto)).toFixed(2)),
                valor_multa: Number(Math.abs(Number(this.valorMulta)).toFixed(2)),
                valor_total: Number(Math.abs(Number(this.valorTotal)).toFixed(2)),
                valor_hora: Number(Math.abs(Number(this.valorHora)).toFixed(2)),
                valor_hora_multa: Number(Math.abs(Number(this.valorHoraMulta)).toFixed(2)),
            });
            this.$router.go(-1);
        },
        async DeletarItem() {
            await deletar_movimentacao(String(this.$route.params.movimentacao_id));
            this.$router.push("/movimentacao")
        }
    }
});
</script>
<template>
    <div class="edicao-movimentacao">
        <div class="container text-start">
            <form @submit="EditarMovimentacao">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path
                                    d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                            </svg>
                            Atualizar
                        </button>
                        <button type="button" class="btn btn-danger" @click="DeletarItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                                </path>
                            </svg>
                            Deletar
                        </button>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Condutor</label>
                        <select v-model="condutor" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma condutor</option>
                            <option v-for="(item) in condutores" :key="item.id" :value="item.value"
                                :selected="item.value === condutor">{{ item.title }}</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Veiculo</label>
                        <select v-model="veiculo" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma veiculo</option>
                            <option v-for="(item) in veiculos" :key="item.value" :value="item.value"
                                :selected="item.value === veiculo">{{ item.title }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Hora Entrada</span>
                            <input type="datetime-local" v-model="entrada" class="form-control" aria-label="Hora Entrada"
                                aria-describedby="basic-addon1">
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
                            <span class="input-group-text" id="basic-addon1">Valor por hora (R$)</span>
                            <input type="text" v-model="valorHora" class="form-control" placeholder="Valor por hora (R$)"
                                aria-label="Valor por hora (R$)" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor total (R$)</span>
                            <input type="text" v-model="valorTotal" class="form-control" placeholder="Valor total"
                                aria-label="Valor total" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <div class="form-check">
                            <input v-model="ativo" class="form-check-input" type="checkbox" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Ativo ?
                            </label>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <h5 v-if="data_cadastro !== ''" class="mb-0">Cadastrado em: <span
                                    class="badge text-bg-warning">{{ data_cadastro }}</span>
                            </h5>
                            <h5 v-if="data_atualizado !== ''" class="mb-0">Editado em: <span
                                    class="badge text-bg-warning">{{ data_atualizado }}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.edicao-movimentacao {
    padding: 30px;
}
</style>