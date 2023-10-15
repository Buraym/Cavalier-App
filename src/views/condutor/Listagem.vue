<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_condutores, list_drivers_paginated, deletar_condutor } from "@/controllers/condutor";
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { formatDuration, secondsToHours, secondsToMinutes } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
const listHeaderTopics: any[] = [
    {
        label: "ID",
        field: "driver.list.table-id-header"
    },
    {
        label: "Nome",
        field: "driver.list.table-name-header"
    },
    {
        label: "CPF",
        field: "driver.list.table-cpf-header"
    },
    {
        label: "Telefone",
        field: "driver.list.table-telephone-header"
    }
]
const data = ref<any[] | []>([]);

const toast = useToast();
export default defineComponent({
    name: 'ListagemCondutor',
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
            try {
                const response = await list_drivers_paginated(page, perPage);
                this.pages = Number(response.totalPages);
                this.items = Number(response.totalItems);
                if (perPage) {
                    this.perPage = Number(perPage);
                }
                this.data = response?.results?.map((item) => ({
                    id: item.id,
                    nome: item.nome,
                    cpf: item.cpf,
                    telefone: item.telefone,
                    tempo_gasto: formatDuration({
                        hours: secondsToHours(item.tempo_gasto),
                        minutes: secondsToMinutes(item.tempo_gasto),
                        seconds: item.tempo_gasto
                    }, { delimiter: ', ', locale: pt_BR }) === "" ? "Nenhum tempo gasto" : formatDuration({
                        hours: secondsToHours(item.tempo_gasto),
                        minutes: secondsToMinutes(item.tempo_gasto),
                        seconds: item.tempo_gasto
                    }, { delimiter: ', ', locale: pt_BR }),
                }));
                if (page) {
                    this.page = Number(page);
                }
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-drivers")),
                    { id: "return-drivers" }
                )
            }
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-id-header")),
                        field: "driver.list.table-id-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-name-header")),
                        field: "driver.list.table-name-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-cpf-header")),
                        field: "driver.list.table-cpf-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-telephone-header")),
                        field: "driver.list.table-telephone-header"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            try {
                await deletar_condutor(id);
                this.data = this.data.filter((item) => item.id !== id);
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "remove-driver")),
                    { id: "remove-driver" }
                )
            }
        }
    }
});
</script>
<template>
    <div class="listagem-condutor">
        <Table :columns="columns" :data="data" :edit="String(/condutor/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/condutor/new">
                {{ $t("driver.list.register-new") }}

            </a>
        </div>
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.listagem-condutor {
    padding: 30px;
}
</style>