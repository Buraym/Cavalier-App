<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MovimentacaoClient } from '@/client/movimentacoes.client';
import Table from '@/components/Table.vue';
import { format, formatDuration, secondsToHours, secondsToMinutes } from 'date-fns';
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
        label: "Tempo desconto",
        name: "tempo_desconto"
    },
    {
        label: "Tempo Multa",
        name: "tempo_multa"
    },
    {
        label: "Valor Hora",
        name: "valor_hora"
    },
    {
        label: "Valor Desconto",
        name: "valor_desconto"
    },
    {
        label: "Valor Multa",
        name: "valor_multa"
    },
    {
        label: "Valor Total",
        name: "valor_total"
    },
    {
        label: "Ações",
        name: "actions",
        actions: true
    }
]
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemMovimentacao',
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
            const client = new MovimentacaoClient();
            this.data = (await client.getList()).map((item) => ({
                id: item.id,
                condutor: item.condutor.nome,
                veiculo: item.veiculo.placa,
                entrada: format(new Date(
                    item.entrada[0] ? item.entrada[0] : 0,
                    item.entrada[1] ? item.entrada[1] - 1 : 0,
                    item.entrada[2] ? item.entrada[2] : 0,
                    item.entrada[3] ? item.entrada[3] : 0,
                    item.entrada[4] ? item.entrada[4] : 0,
                    0,
                    0,
                ), "dd/MM/yyyy - HH:mm"),
                saida: format(new Date(
                    item.saida[0] ? item.saida[0] : 0,
                    item.saida[1] ? item.saida[1] - 1 : 0,
                    item.saida[2] ? item.saida[2] : 0,
                    item.saida[3] ? item.saida[3] : 0,
                    item.saida[4] ? item.saida[4] : 0,
                    0,
                    0,
                ), "dd/MM/yyyy - HH:mm"),
                tempo_desconto: format(new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    secondsToHours(item.tempoDesconto),
                    secondsToMinutes(item.tempoDesconto)
                ), "HH:mm"),
                tempo_multa: format(new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    secondsToHours(item.tempoMulta),
                    secondsToMinutes(item.tempoMulta)
                ), "HH:mm"),
                valor_hora: "R$ " + item.valorHora,
                valor_desconto: "R$ " + item.valorDesconto,
                valor_multa: "R$ " + item.valorMulta,
                valor_total: "R$ " + item.valorTotal,
                actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/movimentacao/" + item.id + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-fill' viewBox='0 0 16 16'><path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/></svg></a><button class='btn btn-danger' @onclick='DeletarItem(" + item.id + ")'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'><path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/></svg></button></div>"
            }));
            console.log(this.data);
        },
        async DeletarItem(id: string) {
            const client = new MovimentacaoClient();
            await client.deleteById(id);
            this.data = this.data.filter((item) => item.id !== id);
            console.log(this.data);
        }
    }
});
</script>
<template>
    <div class="listagem-movimentacao">
        <Table :columns="columns" :data="data" />
        <div>
            <a class="w-100 btn btn-warning" href="/movimentacao/new">
                Cadastrar nova Movimentação
            </a>
        </div>
    </div>
</template>
<style scoped>
.listagem-movimentacao {
    padding: 30px;
}
</style>