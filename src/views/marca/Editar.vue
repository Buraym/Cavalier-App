<script lang="ts">
import { defineComponent } from 'vue';
import { format } from "date-fns"
import {
    editar_marca, retornar_marca, deletar_marca
} from "@/controllers/marca";
export default defineComponent({
    name: 'EdicaoMarca',
    data: () => {
        return {
            nome: "",
            ativo: true,
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarMarca();
    },
    methods: {
        async RetornarMarca() {
            const marca = await retornar_marca(String(this.$route.params.marca_id));
            this.nome = marca.nome;
            this.ativo = marca.ativo ? true : false;
            this.data_cadastro = format(new Date(marca.cadastro), "dd/MM/yyyy HH:mm")
            if (marca.atualizacao) {
                this.data_atualizado = format(new Date(marca.atualizacao), "dd/MM/yyyy HH:mm")
            }
        },
        async EditarMarca(event: any) {
            event.preventDefault();
            await editar_marca(String(this.$route.params.marca_id), { nome: this.nome, ativo: this.ativo });
            this.$router.push("/marca");
        },
        async DeletarItem() {
            await deletar_marca(String(this.$route.params.marca_id));
            this.$router.push("/marca");
        }
    }
});
</script>
<template>
    <div class="edicao-marca">
        <div class="container text-start">
            <form @submit="EditarMarca">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <div class="d-flex align-items-center justify-content-start gap-2">
                        <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                            <i class="bi bi-arrow-left"></i>
                        </a>
                    </div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path
                                    d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                            </svg>
                            {{ $t("brands.edit.update-registry") }}
                        </button>
                        <button type="button" class="btn btn-danger" @click="DeletarItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                                </path>
                            </svg>
                            {{ $t("brands.edit.delete-registry") }}
                        </button>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("brands.edit.brand-name") }}</span>
                        <input type="text" class="form-control" v-model="nome" :placeholder='$t("brands.edit.brand-name")'
                            :aria-label='$t("brands.edit.brand-name")' aria-describedby="basic-addon1">
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="ativo" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ $t("brands.edit.brand-active") }}
                            </label>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <h5 v-if="data_cadastro !== ''" class="mb-0">
                                {{ $t("brands.edit.brand-created-at") }}
                                <span class="badge text-bg-warning">{{ data_cadastro }}</span>
                            </h5>
                            <h5 v-if="data_atualizado !== ''" class="mb-0">
                                {{ $t("brands.edit.brand-updated-at") }}
                                <span class="badge text-bg-warning">{{ data_atualizado }}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.edicao-marca {
    padding: 30px;
}
</style>