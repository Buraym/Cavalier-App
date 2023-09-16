<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
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
        Table
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
            console.log(response);
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
            console.log(this.data);
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
        <div class="d-flex w-100 justify-content-end">
            <nav class="d-flex w-100 justify-content-end" aria-label="Page navigation example">
                <div class="d-flex mx-2 mb-2 mt-3">
                    Exibindo
                    <select v-model="perPage" @change="ListagemDeItens()" class="form-select form-select-sm mx-2 mb-1"
                        aria-label="Small select example">
                        <option value="5" v-bind:selected="perPage === 5">5</option>
                        <option value="10" v-bind:selected="perPage === 10">10</option>
                        <option value="20" v-bind:selected="perPage === 20">20</option>
                        <option value="50" v-bind:selected="perPage === 50">50</option>
                    </select> de <strong class="mx-1"> {{ items }} </strong>
                </div>
                <ul class="pagination mt-2">
                    <li class="page-item" v-if="pages > 1" style="border-right: none">
                        <button v-bind:disabled="page === 1" v-bind:class="{ active: page === 1 }"
                            class="page-link warning-color mx-0" style="border-right: none" aria-label="Previous"
                            @click="ListagemDeItens(1)">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li v-for="pageList in pages" key="pageList" class="page-item"
                        style="border-left: none; border-right: none">
                        <button class="page-link warning-color mx-0" v-bind:class="{ active: page === pageList }"
                            style="border-left: none; border-right: none" @click="ListagemDeItens(pageList)">
                            {{ pageList }}
                        </button>
                    </li>
                    <li class="page-item" v-if="pages > 1" style="border-left: none">
                        <button v-bind:disabled="page === pages" v-bind:class="{ active: page === pages }"
                            class="page-link warning-color mx-0" style="border-left: none" aria-label="Next"
                            @click="ListagemDeItens(pages)">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<style scoped>
.warning-color {
    background: #FFF;
    color: #ffc107;
    transition: 250ms ease-in-out;
}

.form-select-sm {
    height: 28px;
}

.warning-color:hover {
    background: #ffe38e;
}

.warning-color.active {
    border-color: #dee2e6;
    background: #ffc107;
    color: #FFF;
}

.listagem-movimentacao {
    padding: 30px;
}
</style>