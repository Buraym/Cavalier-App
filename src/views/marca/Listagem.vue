<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    listar_marcas, deletar_marca
} from "@/controllers/marca";
import Table from '@/components/Table.vue';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        name: "id",
    },
    {
        label: "Nome",
        name: "nome"
    }
];
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemMarca',
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
            this.data = (await listar_marcas()).map((item) => ({
                id: item.id,
                nome: item.nome,
            }));
            console.log(this.data);
        },
        async DeletarItem(id: string) {
            await deletar_marca(id);
            this.data = this.data.filter((item) => item.id !== id);
            console.log(this.data);
        }
    }
});
</script>
<template>
    <div class="listagem-marca">
        <Table :columns="columns" :data="data" :edit="String(/marca/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/marca/new">
                Cadastrar nova Marca
            </a>
        </div>
    </div>
</template>
<style scoped>
.listagem-marca {
    padding: 30px;
}
</style>