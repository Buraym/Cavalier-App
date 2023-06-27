<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
import { VeiculoClient } from '@/client/veiculo.client';
import { ModeloClient } from '@/client/modelo.client';
const modelos = ref<any[] | []>([]);
export default defineComponent({
    name: 'EdicaoVeiculo',
    data: () => {
        return {
            ativo: true,
            placa: "",
            ano: 2023,
            modelo: null,
            modelos,
            cor: null,
            tipo: null,
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarVeiculo();
    },
    methods: {
        async RetornarVeiculo() {
            const client = new VeiculoClient();
            const modeloClient = new VeiculoClient();
            const data = await client.findById(String(this.$route.params.veiculo_id))
            this.modelos = (await modeloClient.getList()).map((item) => ({ title: item.nome, value: item.id }));
            // this.nome = data.nome;
            // this.marca = data.marca;
            // this.ativo = data.ativo;
            // this.data_cadastro = format(new Date(data.cadastro[0], data.cadastro[1], data.cadastro[2], data.cadastro[3], data.cadastro[4], data.cadastro[5]), "dd/MM/yyyy HH:MM")
            // if (data.atualizacao) {
            //     this.data_atualizado = format(new Date(data.atualizacao[0], data.atualizacao[1], data.atualizacao[2], data.atualizacao[3], data.atualizacao[4], data.atualizacao[5]), "dd/MM/yyyy HH:MM")
            // }
            console.log(data);
        },
        async EditarVeiculo(event: any) {
            event.preventDefault();
            const client = new VeiculoClient();
        }
    }
});
</script>
<template>
    <div class="edicao-veiculo">
        <div class="container text-start">
            <form @submit="EditarVeiculo">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>ID: {{ $route.params.veiculo_id }}</h2>
                    <div class=" d-flex justify-content-center align-items-center gap-2">
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                            Atualizar
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal">
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
                        <span class="input-group-text" id="basic-addon1">Placa do veiculo</span>
                        <input type="text" v-model="placa" class="form-control" placeholder="Placa do veiculo"
                            aria-label="Placa do veiculo" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Ano da versão</span>
                        <input type="number" min="1900" :max="new Date().getFullYear()" v-model="ano" class="form-control"
                            placeholder="Ano da versão" aria-label="Ano da versão" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Modelo</label>
                        <select v-model="modelo" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma modelo</option>
                            <option v-for="(item) in modelos" :key="item.id" :value="item.id">{{ item.title }}</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Cor</label>
                        <select v-model="cor" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma cor</option>
                            <option value="RED">Vermelho</option>
                            <option value="GREEN">Verde</option>
                            <option value="BLUE">Azul</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Tipo de Veiculo</label>
                        <select v-model="tipo" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha um tipo</option>
                            <option value="CARRO">Carro</option>
                            <option value="MOTO">Moto</option>
                            <option value="VAN">Van</option>
                        </select>
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
.edicao-modelo {
    padding: 30px;
}
</style>