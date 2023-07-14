<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import { format, secondsToHours, secondsToMinutes } from 'date-fns';
import { listar_movimentacoes } from '@/utils/database';
import { deletar_movimentacao } from '@/utils/database';
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
            this.data = (await listar_movimentacoes()).map((item) => ({
                id: item.id,
                condutor: item.condutor.nome,
                veiculo: item.veiculo.placa,
                entrada: format(new Date(
                    item.entrada
                ), "dd/MM/yyyy - HH:mm"),
                saida: item.saida ? format(new Date(
                    item.saida
                ), "dd/MM/yyyy - HH:mm") : "Sem saída",
                tempo_desconto: format(new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    secondsToHours(item.tempo_desconto),
                    secondsToMinutes(item.tempo_desconto)
                ), "HH:mm"),
                tempo_multa: format(new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    secondsToHours(item.tempo_desconto),
                    secondsToMinutes(item.tempo_desconto)
                ), "HH:mm"),
                valor_hora: "R$ " + Number(item.valor_hora).toFixed(2),
                valor_desconto: "R$ " + Number(item.valor_desconto).toFixed(2),
                valor_multa: "R$ " + Number(item.valor_multa).toFixed(2),
                valor_total: "R$ " + Number(item.valor_total).toFixed(2),
            }));
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
    </div>
</template>
<style scoped>
.listagem-movimentacao {
    padding: 30px;
}
</style>