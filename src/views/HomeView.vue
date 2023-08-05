<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format, intervalToDuration, isToday } from "date-fns";
import { retornar_configuracao, listar_movimentacoes, deletar_movimentacao } from '@/utils/database';
import Table from '@/components/Table.vue';
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
    label: "Veiculo",
    name: "veiculo_nome",
    is_link: true
  },
  {
    label: "Hora entrada",
    name: "entrada"
  },
  {
    label: "Hora saida",
    name: "saida"
  },
  {
    label: "Tempo desconto",
    name: "tempo_desconto"
  }
]
const listItemTopics = ref<any[] | []>([]);
let hours = intervalToDuration({
  start: new Date(2023, 6, 15, 17, 37),
  end: new Date(2023, 6, 15, 20, 12)
}).hours
let minutes = intervalToDuration({
  start: new Date(2023, 6, 15, 17, 37),
  end: new Date(2023, 6, 15, 20, 12)
}).minutes
listItemTopics.value = [
  {
    id: "asdasdasd",
    name: "Eriberto",
    cpf: "xxx.xxx.xxx-xx",
    veiculo_nome: "Vectra",
    entrada: format(new Date(2023, 6, 15, 17, 37), 'dd/MM/yyyy - HH:mm'),
    saida: format(new Date(2023, 6, 15, 20, 12), 'dd/MM/yyyy - HH:mm'),
    tempo_desconto: (hours && hours < 10 ? "0" + hours : hours) + ":" + (minutes && minutes < 10 ? "0" + minutes : minutes),
    valor_total: "R$ 45,90"
  },
  {
    id: "asdasdasd",
    name: "Claudio",
    cpf: "xxx.xxx.xxx-xx",
    veiculo_nome: "Jetta",
    entrada: format(new Date(2023, 6, 15, 17, 37), 'dd/MM/yyyy - HH:mm'),
    saida: format(new Date(2023, 6, 15, 20, 12), 'dd/MM/yyyy - HH:mm'),
    tempo_desconto: (hours && hours < 10 ? "0" + hours : hours) + ":" + (minutes && minutes < 10 ? "0" + minutes : minutes),
    valor_total: "R$ 45,90"
  },
  {
    id: "asdasdasd",
    name: "Vanessa",
    cpf: "xxx.xxx.xxx-xx",
    veiculo_nome: "Civic",
    entrada: format(new Date(2023, 6, 15, 17, 37), 'dd/MM/yyyy - HH:mm'),
    saida: format(new Date(2023, 6, 15, 20, 12), 'dd/MM/yyyy - HH:mm'),
    tempo_desconto: (hours && hours < 10 ? "0" + hours : hours) + ":" + (minutes && minutes < 10 ? "0" + minutes : minutes),
    valor_total: "R$ 45,90"
  },
  {
    id: "asdasdasd",
    name: "Alessandra",
    cpf: "xxx.xxx.xxx-xx",
    veiculo_nome: "Uno V3",
    entrada: format(new Date(2023, 6, 15, 17, 37), 'dd/MM/yyyy - HH:mm'),
    saida: format(new Date(2023, 6, 15, 20, 12), 'dd/MM/yyyy - HH:mm'),
    tempo_desconto: (hours && hours < 10 ? "0" + hours : hours) + ":" + (minutes && minutes < 10 ? "0" + minutes : minutes),
    valor_total: "R$ 45,90"
  }
]
let OldMovimentations = ref<any[] | []>([]);
let UsedParkingSpots = ref<any[] | []>([]);
let config = ref<any>(null);
// await init_db();
export default defineComponent({
  name: 'HomeView',
  data: () => {
    return {
      OldMovimentations,
      UsedParkingSpots,
      columns: listHeaderTopics,
      config,
    }
  },
  components: {
    Table
  },
  mounted() {
    this.RetornarConfiguracao();
    this.RetornarVagas();
  },
  methods: {
    async RetornarConfiguracao() {
      this.config = await retornar_configuracao();
      console.log(await retornar_configuracao());
    },
    async RetornarVagas() {
      const list = await listar_movimentacoes();
      console.log(list);
      this.OldMovimentations = list.filter((item: any) =>
        item.ativo && item.saida &&
        isToday(
          new Date(
            item.entrada
          )
        )
      ).map((item) => ({
        id: item.id,
        name: item.condutor.nome,
        cpf: item.condutor.cpf,
        veiculo_nome: item.veiculo.nome,
        entrada: format(new Date(
          item.entrada
        ), 'dd/MM/yyyy - HH:mm'),
        saida: item.saida ? format(new Date(
          item.saida
        ), 'dd/MM/yyyy - HH:mm') : "Sem saída",
        valor_total: "R$ " + Number(item.valor_total).toFixed(2)
      }));
      this.UsedParkingSpots = list.filter((item: any) =>
        item.ativo &&
        item.saida === null
      ).map((item) => ({
        condutor: String(item.condutor.nome) + " | " + String(item.condutor.cpf),
        condutor_id: String(item.condutor.id),
        entrada: format(new Date(
          item.entrada
        ), 'dd/MM/yyyy - HH:mm'),
        duracao: new Date() < new Date(
          item.entrada
        ) ? "" : `${intervalToDuration({
          start: new Date(
            item.entrada
          ), end: new Date()
        }).days} dia(s), ${intervalToDuration({
          start: new Date(
            item.entrada
          ), end: new Date()
        }).hours} Hora(s) e ${intervalToDuration({
          start: new Date(
            item.entrada
          ), end: new Date()
        }).minutes} minuto(s)`,
        veiculo: String(item.veiculo.modelo.nome) + " " + String(item.veiculo.ano),
        veiculo_id: String(item.veiculo.id),
        placa: item.veiculo.placa
      }));
    },
    async DeletarItem(id: string) {
      await deletar_movimentacao(id);
      const list = await listar_movimentacoes();
      this.OldMovimentations = list.filter((item: any) =>
        item.ativo &&
        isToday(
          new Date(
            item.entrada
          )
        )
      ).map((item) => ({
        id: item.id,
        name: item.condutor.nome,
        cpf: item.condutor.cpf,
        veiculo_nome: item.veiculo.nome,
        entrada: format(new Date(
          item.entrada
        ), 'dd/MM/yyyy - HH:mm'),
        saida: item.saida ? format(new Date(
          item.saida
        ), 'dd/MM/yyyy - HH:mm') : "Sem saída",
        valor_total: "R$ " + Number(item.valor_total).toFixed(2)
      }));
    },
    async EncerrarEstacionamento(id: string) {

    }
  }
});
</script>
<template>
  <div class="home">
    <div v-if="UsedParkingSpots.length > 0" class="row row-cols-1 row-cols-md-3 g-5 px-5 pt-3">
      <div class="col" v-for="(item) in UsedParkingSpots" :key="item.id">
        <div class="card">
          <div class="card-header">
            <a :href='"/condutor/" + item.condutor_id' class="list-group-item list-group-item-action">
              {{ item.condutor }}
            </a>
          </div>
          <div class="m-3 mb-1 d-flex">
            <a :href='"/veiculo/" + item.veiculo_id' class="vehicle-link">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 w-100">
                  {{ item.veiculo }}
                </p>
              </div>
              <small>{{ item.placa }}</small>
            </a>
            <button type="button" class="btn btn-warning text-white" aria-label="Encerrar vaga">
              <i class="bi bi-explicit-fill"></i>
            </button>
          </div>
          <div class="w-100 d-flex justify-content-between px-3 mb-1">
            <small>*Entrada: {{ item.entrada }}</small>
            <small>{{ item.duracao }}</small>
          </div>
        </div>
      </div>
    </div>
    <div v-if="OldMovimentations.length > 0" class="container py-3 my-3">
      <Table :columns="columns" :data="OldMovimentations" :title="'Movimentações dos condutores hoje'"
        :edit="String(/movimentacao/)" :remove="DeletarItem" />
    </div>
  </div>
</template>
<style scoped>
.vehicle-link {
  width: 90%;
  padding: 20px;
  text-decoration: none;
  color: black;
  border: 1px solid #dee2e6;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.btn-warning {
  width: 10%;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}
</style>
