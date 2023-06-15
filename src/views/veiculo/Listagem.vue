<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import { VeiculoClient } from '@/client/veiculo.client';
import { EspecialidadeClient } from '@/client/especialidade.client';
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
        name: "telefone"
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
const listItemTopics = ref<any[] | []>([]);
const data = await new EspecialidadeClient().getList();
console.log(data.drinks);
listItemTopics.value = [
    {
        id: "345342fs6d7a8afd",
        modelo: "Vectra",
        ano: "2020",
        placa: "A4E2C9",
        cor: "PRETO"
    },
    {
        id: "345342fs6d7a8afd",
        modelo: "Civic",
        ano: "2018",
        placa: "C9V5B1",
        cor: "BRANCO"
    },
    {
        id: "345342fs6d7a8afd",
        modelo: "Lamborghini Aventador",
        ano: "2015",
        placa: "Y83O0P",
        cor: "VERMELHO"
    }
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