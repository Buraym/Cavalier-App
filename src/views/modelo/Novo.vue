<script lang="ts">
import { MarcaClient } from '@/client/marca.client';
import { ModeloClient } from '@/client/modelo.client';
import { defineComponent, ref } from 'vue';
const marcas = ref<any[] | []>([]);
export default defineComponent({
    name: 'CadastroModelo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            name: "",
            marca: null,
            marcas,
        }
    },
    mounted() {
        this.RetornarMarcas();
    },
    methods: {
        async RetornarMarcas() {
            const marcaClient = new MarcaClient();
            this.marcas = (await marcaClient.getList()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            const client = new ModeloClient();
            await client.create({
                name: this.name,
                marca: this.marca
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
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Modelo</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome do Modelo</span>
                        <input type="text" class="form-control" placeholder="Nome da Modelo" aria-label="Nome da Modelo"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Marca</label>
                        <select v-model="marca" class="form-select" id="inputGroupSelect01">
                            <option value="null">Escolha uma marca</option>
                            <option v-for="(item) in marcas" :key="item.id" :value="item.id">{{ item.title }}</option>
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