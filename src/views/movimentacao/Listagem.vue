<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { format } from 'date-fns';
import { deletar_movimentacao, listar_movimentacoes_paginated } from '@/controllers/movimentacao';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
import { retornar_configuracao } from '@/controllers/configuracao';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        field: "movimentation.list.table-id-header"
    },
    {
        label: "Condutor",
        field: "movimentation.list.table-driver-name-header"
    },
    {
        label: "Veiculo",
        field: "movimentation.list.table-vehicle-name-header"
    },
    {
        label: "Entrada",
        field: "movimentation.list.table-enter-time-header"
    },
    {
        label: "Saída",
        field: "movimentation.list.table-exit-time-header"
    },
    {
        label: "Valor Hora",
        field: "movimentation.list.table-hourly-value-header"
    },
    {
        label: "Valor Total",
        field: "movimentation.list.table-total-value-header"
    }
]
const data = ref<any[] | []>([]);
const toast = useToast();
let config = ref<any>(null);
export default defineComponent({
    name: 'ListagemMovimentacao',
    data: () => {
        return {
            config,
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
    async mounted() {
        await this.updateColumnHeadersLocalization();
        await this.ListagemDeItens(this.page, this.perPage);
    },
    methods: {
        async ListagemDeItens(page: Number, perPage: Number) {
            try {
                const currencies = {
                    "ARS": "es-AR",
                    "PYG": "es-PY",
                    "USD": "en-US",
                    "BRL": "pt-BR",
                }
                const formatter = new Intl.NumberFormat(
                    // @ts-ignore
                    currencies[String(this.config.moeda).toUpperCase()],
                    { style: 'currency', currency: String(this.config.moeda).toUpperCase() }
                );
                const response = await listar_movimentacoes_paginated(page, perPage);
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
                    valor_hora: formatter.format(Number(item.valor_hora)),
                    valor_total: formatter.format(Number(item.valor_total)),
                }));
                if (page) {
                    this.page = Number(page);
                }
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-movimentations")),
                    { id: "return-movimentations" }
                )
            }
        },
        async updateColumnHeadersLocalization() {
            this.config = await retornar_configuracao();
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-id-header")),
                        field: "movimentation.list.table-id-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-driver-name-header")),
                        field: "movimentation.list.table-driver-name-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-vehicle-name-header")),
                        field: "movimentation.list.table-vehicle-name-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-enter-time-header")),
                        field: "movimentation.list.table-enter-time-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-exit-time-header")),
                        field: "movimentation.list.table-exit-time-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-hourly-value-header")),
                        field: "movimentation.list.table-hourly-value-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "movimentation", "list", "table-total-value-header")),
                        field: "movimentation.list.table-total-value-header"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            try {
                await deletar_movimentacao(id);
                this.data = this.data.filter((item) => item.id !== id);
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "remove-movimentation")),
                    { id: "remove-movimentation" }
                )
            }
        }
    }
});
</script>
<template>
    <div class="listagem-movimentacao">
        <Table :columns="columns" :data="data" :edit="String(/movimentacao/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/movimentacao/new">
                {{ $t("movimentation.list.register-new") }}
            </a>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.listagem-movimentacao {
    padding: 30px;
}
</style>