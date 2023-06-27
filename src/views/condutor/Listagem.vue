<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CondutorClient } from "@/client/condutor.client"
import Table from '@/components/Table.vue';
import { formatDuration, secondsToHours, secondsToMinutes } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
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
    },
    {
        label: "Ações",
        name: "actions",
        actions: true
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemCondutor',
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
            const client = new CondutorClient();
            this.data = (await client.getList()).map((item) => ({
                id: item.id,
                nome: item.nome,
                cpf: item.cpf,
                telefone: item.telefone,
                tempo_gasto: formatDuration({
                    hours: secondsToHours(item.tempo_gasto),
                    minutes: secondsToMinutes(item.tempo_gasto),
                    seconds: item.tempo_gasto
                }, { delimiter: ', ', locale: pt_BR }),
                secondsToMinutes: item.cpf,
                actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/condutor/" + item.id + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-fill' viewBox='0 0 16 16'><path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/></svg></a><button class='btn btn-danger' @onclick='DeletarItem(" + item.id + ")'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'><path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/></svg></button></div>"
            }));
            this.data = [
                {
                    id: "wwrwer",
                    nome: "wwrwer",
                    cpf: "wwrwer",
                    telefone: "wwrwer",
                    tempo_gasto: formatDuration({
                        hours: 5,
                        minutes: 9,
                        seconds: 30
                    }, { delimiter: ', ', locale: pt_BR }),
                    actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/condutor/" + "wwrwer" + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-fill' viewBox='0 0 16 16'><path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/></svg></a><button class='btn btn-danger' @onclick='DeletarItem(" + "wwrwer" + ")'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'><path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/></svg></button></div>"
                }
            ]
            console.log(this.data);
        },
        async DeletarItem(id: string) {
            const client = new CondutorClient();
            await client.deleteById(id);
            this.data = this.data.filter((item) => item.id !== id);
            console.log(this.data);
        }
    }
});
</script>
<template>
    <div class="listagem-condutor">
        <Table :columns="columns" :data="data" />
        <div>
            <a class="w-100 btn btn-warning" href="/condutor/new">
                Cadastrar novo Condutor
            </a>
        </div>
    </div>
</template>
<style scoped>
.listagem-condutor {
    padding: 30px;
}
</style>