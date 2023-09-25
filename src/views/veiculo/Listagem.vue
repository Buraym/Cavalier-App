<script lang="ts">
import { defineComponent, ref } from 'vue';
import { list_vehicles_paginated, listar_veiculos, deletar_veiculo } from '@/controllers/veiculo';
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { COLORS } from '@/utils/constants';
import { getLocalisedMessage } from '../../utils/index';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        name: "id"
    },
    {
        label: "Modelo",
        name: "modelo"
    },
    {
        label: "Ano",
        name: "ano"
    },
    {
        label: "Placa",
        name: "placa"
    },
    {
        label: "Cor",
        name: "cor"
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemVeiculo',
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
            const response = await list_vehicles_paginated(page, perPage);
            this.pages = Number(response.totalPages);
            this.items = Number(response.totalItems);
            this.data = response?.results?.map((item) => ({
                id: item.id,
                modelo: String(item.modelo.nome) + " - " + String(item.placa),
                ano: item.ano,
                placa: item.placa,
                cor: COLORS[item.cor],
            }));
            if (page) {
                this.page = Number(page);
            }
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "vehicles", "list", "table-id-header")),
                        name: "id"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "vehicles", "list", "table-model-name-header")),
                        name: "modelo"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "vehicles", "list", "table-year-header")),
                        name: "ano"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "vehicles", "list", "table-plate-header")),
                        name: "placa"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "vehicles", "list", "table-color-header")),
                        name: "cor"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            await deletar_veiculo(id);
            this.data = this.data.filter((item) => item.id !== id);
        }
    }
});
</script>
<template>
    <div class="listagem-veiculo">
        <Table :columns="columns" :data="data" :edit="String(/veiculo/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/veiculo/new">
                {{ $t("vehicles.list.register-new") }}
            </a>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.listagem-veiculo {
    padding: 30px;
}
</style>