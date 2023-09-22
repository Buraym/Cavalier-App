<script lang="ts">
import { listar_marcas } from '@/controllers/marca';
import { criar_modelo } from '@/controllers/modelo';
import { defineComponent, ref } from 'vue';
const marcas = ref<any[] | []>([]);
export default defineComponent({
    name: 'CadastroModelo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            nome: "",
            marca: null,
            marcas,
        }
    },
    mounted() {
        this.RetornarMarcas();
    },
    methods: {
        async RetornarMarcas() {
            this.marcas = (await listar_marcas()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            await criar_modelo({
                nome: this.nome,
                marca_id: this.marca
            });
            this.$router.push('/modelo')
        }
    }
});
</script>
<template>
    <div class="cadastro-modelo">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-start gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <h2 class="mb-0">Cadastro de Modelo</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome do Modelo</span>
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome da Modelo"
                            aria-label="Nome da Modelo" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Marca</label>
                        <select v-model="marca" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">Escolha uma marca</option>
                            <option v-for="(item) in marcas" :key="item.id" :value="item.value" selected>{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">Cadastrar modelo</button>
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