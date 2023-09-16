<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_veiculos, deletar_veiculo } from '@/controllers/veiculo';
import Table from '@/components/Table.vue';
import { COLORS } from '@/utils/constants';
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
        name: "ano"
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
const data = ref<any[] | []>([]);
export default defineComponent({
    name: 'ListagemVeiculo',
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
            this.data = (await listar_veiculos()).map((item) => ({
                id: item.id,
                modelo: String(item.modelo.nome) + " - " + String(item.placa),
                ano: item.ano,
                placa: item.placa,
                cor: COLORS[item.cor],
            }));
        },
        async DeletarItem(id: string) {
            await deletar_veiculo(id);
            this.data = this.data.filter((item) => item.id !== id);
        }
    }
});
</script>
<template>
    <div class="listagem-veiculo">
        <Table :columns="columns" :data="data" :edit="String(/veiculo/)" :remove="DeletarItem" />
        <div>
            <a class="w-100 btn btn-warning" href="/veiculo/new">
                Cadastrar novo Veículo
            </a>
        </div>
    </div>
</template>
<style scoped>
.listagem-veiculo {
    padding: 30px;
}
</style>