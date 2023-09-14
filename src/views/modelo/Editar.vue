<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
import { editar_modelo, retornar_modelo, retornar_marca, deletar_modelo, listar_marcas } from '@/utils/database';
const marcas = ref<any[] | []>([]);
export default defineComponent({
    name: 'EdicaoModelo',
    data: () => {
        return {
            ativo: true,
            nome: "",
            marca: null,
            marcas,
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarMarcas();
        this.RetornarModelo();
    },
    methods: {
        async RetornarMarcas() {
            console.log((await listar_marcas()));
            this.marcas = (await listar_marcas()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async RetornarModelo() {
            const modelo = await retornar_modelo(String(this.$route.params.modelo_id));
            this.nome = modelo.nome;
            this.marca = modelo.marca.id;
            this.ativo = modelo.ativo ? true : false;
            this.data_cadastro = format(new Date(modelo.cadastro), "dd/MM/yyyy HH:mm")
            if (modelo.atualizacao) {
                this.data_atualizado = format(new Date(modelo.atualizacao), "dd/MM/yyyy HH:mm")
            }
        },
        async EditarModelo(event: any) {
            event.preventDefault();
            await editar_modelo(String(this.$route.params.modelo_id), {
                nome: this.nome,
                ativo: this.ativo,
                marca_id: this.marca
            })
            this.$router.push("/modelo")
        },
        async DeletarItem() {
            await deletar_modelo(String(this.$route.params.modelo_id));
            this.$router.push("/modelo")
        }
    }
});
</script>
<template>
    <div class="edicao-modelo">
        <div class="container text-start">
            <form @submit="EditarModelo">
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
                        <span class="input-group-text" id="basic-addon1">Nome do Modelo</span>
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome da Modelo"
                            aria-label="Nome da Modelo" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Marca</label>
                        <select v-model="marca" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma marca</option>
                            <option v-for="(opcao_marca) in marcas" :key="opcao_marca.id" :value="opcao_marca.value">
                                {{ opcao_marca.title }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <div class="form-check">
                            <input v-model="ativo" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
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