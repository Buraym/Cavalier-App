<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_condutores, list_drivers_paginated, deletar_condutor } from "@/controllers/condutor";
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { formatDuration, secondsToHours, secondsToMinutes } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
import { getLocalisedMessage } from '../../utils/index';
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
        label: "CPF",
        name: "cpf"
    },
    {
        label: "Telefone",
        name: "telefone"
    },
    {
        label: "Tempo Gasto",
        name: "tempo_gasto"
    }
]
const data = ref<any[] | []>([]);
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
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-id-header")),
                        name: "id"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-name-header")),
                        name: "nome"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-cpf-header")),
                        name: "cpf"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-telephone-header")),
                        name: "telefone"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "driver", "list", "table-time-spent-header")),
                        name: "tempo_gasto"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            await deletar_condutor(id);
            this.data = this.data.filter((item) => item.id !== id);
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