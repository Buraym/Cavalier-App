<script lang="ts">
import { defineComponent } from 'vue';
import { format } from "date-fns"
import { retornar_condutor, editar_condutor, deletar_condutor } from '@/utils/database';
import { IntToTime } from '@/utils';
import { StringToTime } from '../../utils/index';
export default defineComponent({
    name: 'EdicaoCondutor',
    data: () => {
        return {
            ativo: true,
            nome: "",
            cpf: "",
            telefone: "",
            tempoGasto: "",
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarCondutor();
    },
    methods: {
        async RetornarCondutor() {
            const condutor = await retornar_condutor(String(this.$route.params.condutor_id))
            this.nome = condutor.nome;
            this.cpf = condutor.cpf;
            this.ativo = condutor.ativo ? true : false;
            this.telefone = condutor.telefone;
            this.tempoGasto = String(IntToTime(Number(condutor.tempo_gasto)));
            this.data_cadastro = format(new Date(condutor.cadastro), "dd/MM/yyyy HH:MM")
            if (condutor.atualizacao) {
                this.data_atualizado = format(new Date(condutor.atualizacao), "dd/MM/yyyy HH:MM")
            }
            console.log(condutor);
        },
        async EditarCondutor(event: any) {
            event.preventDefault();
            await editar_condutor(String(this.$route.params.condutor_id), {
                nome: this.nome,
                cpf: this.cpf,
                ativo: this.ativo,
                telefone: this.telefone,
                tempoGasto: StringToTime(String(this.tempoGasto))
            });
            this.$router.push('/condutor');
        },
        async RemoverCondutor() {
            await deletar_condutor(String(this.$route.params.condutor_id));
            this.$router.push('/condutor');
        }
    }
});
</script>
<template>
    <div class="edicao-condutor">
        <div class="container text-start">
            <form @submit="EditarCondutor">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>ID: {{ $route.params.condutor_id }}</h2>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path
                                    d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                            </svg>
                            Atualizar
                        </button>
                        <button @click="RemoverCondutor" type="button" class="btn btn-danger" data-bs-toggle="modal"
                            data-bs-target="#deletemodal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-person-x" viewBox="0 0 16 16">
                                <path
                                    d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                <path
                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
                            </svg>
                            Deletar
                        </button>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome Completo</span>
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome" aria-label="Nome"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">CPF</span>
                        <input type="text" v-model="cpf" class="form-control" placeholder="CPF" aria-label="CPF"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefone</span>
                        <input type="text" v-model="telefone" class="form-control" placeholder="Telefone"
                            aria-label="Telefone" aria-describedby="basic-addon1">
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo Gasto</span>
                            <input type="time" v-model="tempoGasto" class="form-control" placeholder="Tempo Gasto"
                                aria-label="Tempo pago" aria-describedby="basic-addon1">
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
.edicao-condutor {
    padding: 30px;
}
</style>