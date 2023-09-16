<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_condutores, deletar_condutor } from "@/controllers/condutor";
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
            this.data = (await listar_condutores()).map((item) => ({
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
            console.log(this.data);
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