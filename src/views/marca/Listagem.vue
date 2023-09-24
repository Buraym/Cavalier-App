<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    deletar_marca, list_brands_paginated
} from "@/controllers/marca";
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { getLocalisedMessage } from '@/utils';
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
            items: 1,
            page: 1,
            pages: 1,
            perPage: 5,
            columns: listHeaderTopics
        }
    },
    components: {
        Table, Pagination
    },
    mounted() {
        this.updateColumnHeadersLocalization();
        this.ListagemDeItens(this.page, this.perPage);
    },
    methods: {
        async ListagemDeItens(page: Number, perPage: Number) {
            const response = await list_brands_paginated(Number(page ? page : this.page), perPage);
            this.pages = Number(response.totalPages);
            this.items = Number(response.totalItems);
            if (perPage) {
                this.perPage = Number(perPage);
            }
            // @ts-ignore
            this.data = response?.results?.map((item) => ({
                id: item.id,
                nome: item.nome,
            }));
            if (page) {
                this.page = Number(page);
            }
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "brands", "list", "table-id-header")),
                        name: "id"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "brands", "list", "table-name-header")),
                        name: "nome"
                    },
                ]
            }
        },
        async DeletarItem(id: string) {
            await deletar_marca(id);
            this.data = this.data.filter((item) => item.id !== id);
        }
    }
});
</script>
<template>
    <div class="brands-list">
        <Table :columns="columns" :data="data" :edit="String(/marca/)" :remove="DeletarItem" />
        <div>
            <router-link class="w-100 btn btn-warning" to="/marca/new">{{ $t("brands.list.register-new") }}</router-link>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.brands-list {
    padding: 30px;
}
</style>