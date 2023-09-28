<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    list_models_paginated,
    listar_modelos,
    deletar_modelo
} from "@/controllers/modelo";
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { getLocalisedMessage } from '../../utils/index';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        field: "models.list.table-id-header"
    },
    {
        label: "Nome",
        field: "models.list.table-name-header"
    },
    {
        label: "Marca",
        field: "models.list.table-brand-name-header"
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemModelo',
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
        this.updateColumnHeadersLocalization();
        this.ListagemDeItens(this.page, this.perPage);
    },
    methods: {
        async ListagemDeItens(page: Number, perPage: Number) {
            const response = await list_models_paginated(page, perPage);
            this.pages = Number(response.totalPages);
            this.items = Number(response.totalItems);
            this.data = response?.results?.map((item) => ({
                id: item.id,
                nome: item.nome,
                marca: item.marca.nome,
            }));
            if (page) {
                this.page = Number(page);
            }
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "models", "list", "table-id-header")),
                        field: "models.list.table-id-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "models", "list", "table-name-header")),
                        field: "models.list.table-name-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "models", "list", "table-brand-name-header")),
                        field: "models.list.table-brand-name-header"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            await deletar_modelo(id);
            this.data = this.data.filter((item) => item.id !== id);
        }
    }
});
</script>
<template>
    <div class="listagem-modelo">
        <Table :columns="columns" :data="data" :edit="String(/modelo/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/modelo/new">
                {{ $t("models.list.register-new") }}
            </a>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.listagem-modelo {
    padding: 30px;
}
</style>