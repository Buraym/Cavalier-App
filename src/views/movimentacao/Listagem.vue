<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { format } from 'date-fns';
import { deletar_movimentacao, listar_movimentacoes_paginated } from '@/controllers/movimentacao';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        name: "id"
    },
    {
        label: "Condutor",
        name: "condutor"
    },
    {
        label: "Veiculo",
        name: "veiculo"
    },
    {
        label: "Entrada",
        name: "entrada"
    },
    {
        label: "Saída",
        name: "saida"
    },
    {
        label: "Valor Hora",
        name: "valor_hora"
    },
    {
        label: "Valor Total",
        name: "valor_total"
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemMovimentacao',
    data: () => {
        return {
            data,
            items: 1,
            page: 1,
            pages: 1,
            perPage: 5,
            columns: listHeaderTopics
        }
    },
    components: {
        Table,
        Pagination
    },
    mounted() {
        this.ListagemDeItens();
    },
    methods: {
        async ListagemDeItens(page?: Number, perPage?: Number) {
            const response = await listar_movimentacoes_paginated(Number(page ? page : this.page), 20);
            this.pages = Number(response.totalPages);
            this.items = Number(response.totalItems);
            if (perPage) {
                this.perPage = Number(perPage);
            }
            // @ts-ignore
            this.data = response?.results?.map((item) => ({
                id: item.id,
                condutor: item.condutor.nome,
                veiculo: item.veiculo.placa,
                entrada: format(new Date(
                    item.entrada
                ), "dd/MM/yyyy - HH:mm"),
                saida: item.saida ? format(new Date(
                    item.saida
                ), "dd/MM/yyyy - HH:mm") : "Sem saída",
                valor_hora: "R$ " + Number(item.valor_hora).toFixed(2),
                valor_total: "R$ " + Number(item.valor_total).toFixed(2),
            }));
            if (page) {
                this.page = Number(page);
            }
        },
        async DeletarItem(id: string) {
            await deletar_movimentacao(id);
            this.data = this.data.filter((item) => item.id !== id);
        }
    }
});
</script>
<template>
    <div class="listagem-movimentacao">
        <Table :columns="columns" :data="data" :edit="String(/movimentacao/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/movimentacao/new">
                Cadastrar nova Movimentação
            </a>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.form-select-sm {
    height: 28px;
}

.listagem-movimentacao {
    padding: 30px;
}
</style>