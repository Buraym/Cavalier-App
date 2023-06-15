<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
// import { CondutorClient } from '@/client/condutor.client.ts';
import { EspecialidadeClient } from '@/client/especialidade.client';
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
        label: "Tempo Pago",
        name: "tempo_pago"
    },
    {
        label: "Tempo Desconto",
        name: "tempo_desconto"
    }
]
const listItemTopics = ref([]);
const data = await new EspecialidadeClient().getList();
console.log(data.drinks);
listItemTopics.value = data.drinks.map((item: any) => {
    let ingredients = [
        item.strIngredient1,
        item.strIngredient2,
        item.strIngredient3,
        item.strIngredient4,
        item.strIngredient5,
        item.strIngredient6,
        item.strIngredient7,
        item.strIngredient8,
        item.strIngredient9,
        item.strIngredient10,
        item.strIngredient11,
        item.strIngredient12,
        item.strIngredient13,
        item.strIngredient14,
        item.strIngredient15,
    ].filter((item) => item !== null).join(", ");
    return {
        id: item.idDrink,
        name: item.strDrink,
        ingredients,
        receipt: item.strInstructions,
    }
});
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
        {{ $route.params.veiculo_id }}
    </div>
</template>
<style scoped>
.listagem-condutor {
    padding: 30px;
}
</style>