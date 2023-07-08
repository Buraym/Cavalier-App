<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_modelos, deletar_modelo } from '@/utils/database';
import Table from '@/components/Table.vue';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        name: "id"
    },
    {
        label: "Nome",
        name: "nome"
    },
    {
        label: "Marca",
        name: "marca"
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemModelo',
    data: () => {
        return {
            data,
            columns: listHeaderTopics
        }
    },
    components: {
        Table
    },
    mounted() {
        this.ListagemDeItens();
    },
    methods: {
        async ListagemDeItens() {
            this.data = (await listar_modelos()).map((item) => ({
                id: item.id,
                nome: item.nome,
                marca: item.marca.nome,
            }));
            console.log(this.data);
        },
        async DeletarItem(id: string) {
            await deletar_modelo(id);
            this.data = this.data.filter((item) => item.id !== id);
            console.log(this.data);
        }
    }
});
</script>
<template>
    <div class="listagem-modelo">
        <Table :columns="columns" :data="data" :edit="String(/modelo/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/modelo/new">
                Cadastrar novo Modelo
            </a>
        </div>
    </div>
</template>
<style scoped>
.listagem-modelo {
    padding: 30px;
}
</style>