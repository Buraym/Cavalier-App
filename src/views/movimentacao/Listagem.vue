<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import { EspecialidadeClient } from '@/client/especialidade.client';
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
        name: "valor_hora"
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
const listItemTopics = ref<any[] | []>([]);
const data = await new EspecialidadeClient().getList();
console.log(data.drinks);
listItemTopics.value = [
    {
        id: "345342fs6d7a8afd",
        condutor: "Pedro",
        veiculo: "Vectra",
        entrada: "22/08/2023 12:30",
        saída: "22/08/2023 12:57",
        tempo_desconto: "00:02",
        tempo_multa: "00:00",
        valor_hora: "R$ 12,50",
        valor_desconto: "R$ 2,35",
        valor_multa: "R$ 2,35",
        valor_total: "R$ 10,15",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/movimentacao/345342fs6d7a8afd'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
]
export default defineComponent({
    name: 'ListagemCondutor',
    data: () => {
        return {
            data: listItemTopics,
            columns: listHeaderTopics
        }
    },
    components: {
        Table
    },
});
</script>
<template>
    <div class="listagem-condutor">
        <Table :columns="columns" :data="data" />
    </div>
</template>
<style scoped>
.listagem-condutor {
    padding: 30px;
}
</style>