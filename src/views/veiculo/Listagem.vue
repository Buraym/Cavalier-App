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
        modelo: "Vectra",
        ano: "2020",
        placa: "A4E2C9",
        cor: "PRETO",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/veiculo/345342fs6d7a8afd'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "345342fs6d7a8afd",
        modelo: "Civic",
        ano: "2018",
        placa: "C9V5B1",
        cor: "BRANCO",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/veiculo/345342fs6d7a8afd'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "345342fs6d7a8afd",
        modelo: "Lamborghini Aventador",
        ano: "2015",
        placa: "Y83O0P",
        cor: "VERMELHO",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/veiculo/345342fs6d7a8afd'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
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