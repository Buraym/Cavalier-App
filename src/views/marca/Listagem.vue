<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import { MarcaClient } from '../../client/marca.client';
const listHeaderTopics: any[] = [
    {
        label: "ID",
        name: "id",
    },
    {
        label: "Nome",
        name: "nome"
    },
    {
        label: "Ações",
        name: "actions",
        actions: true
    }
]
const listItemTopics = ref<any>([]);
listItemTopics.value = [
    {
        id: "wr45251c2f1d4",
        nome: "Lamborghini",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/marca/chevrolet'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "afsadf7a8sd9a",
        nome: "Ferrari",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/marca/chevrolet'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "dsdfh7d8sfgd0",
        nome: "Ford",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/marca/chevrolet'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "adgsf7ad8fadf",
        nome: "Wolkswagen",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/marca/chevrolet'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    },
    {
        id: "gsdgh7sf8ddfs",
        nome: "Chevrolet",
        actions: "<div class='d-flex justify-content-center align-items-center gap-2'><a class='btn btn-warning' href='/marca/chevrolet'>Editar</a><button class='btn btn-danger'>Deletar</button></div>"
    }
]
export default defineComponent({
    name: 'ListagemMarca',
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
    <div class="listagem-marca">
        <Table :columns="columns" :data="data" />
    </div>
</template>
<style scoped>
.listagem-marca {
    padding: 30px;
}
</style>