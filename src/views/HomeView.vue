<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format, intervalToDuration, isToday } from "date-fns";
import { MovimentacaoClient } from "@/client/movimentacoes.client";
import { ConfiguracaoClient } from "@/client/configuracao.client";
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
  },
  {
    label: "Valor Total",
    name: "valor_total"
  },
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
      const client = new ConfiguracaoClient();
      this.config = await client.getConfig();
    },
    async RetornarVagas() {
      const client = new MovimentacaoClient();
      const list = await client.getList();
      this.OldMovimentations = list.filter((item: any) =>
        item.ativo &&
        isToday(
          new Date(
            item.entrada[0],
            item.entrada[1],
            item.entrada[2],
            item.entrada[3],
            item.entrada[4]
          )
        )
      ).map((item) => ({
        id: item.id,
        name: item.condutor.nome,
        cpf: item.condutor.cpf,
        veiculo_nome: item.veiculo.nome,
        entrada: format(new Date(
          item.entrada[0],
          item.entrada[1],
          item.entrada[2],
          item.entrada[3],
          item.entrada[4],
          item.entrada[5]
        ), 'dd/MM/yyyy - HH:mm'),
        saida: format(new Date(
          item.saida[0],
          item.saida[1],
          item.saida[2],
          item.saida[3],
          item.saida[4],
          item.saida[5]
        ), 'dd/MM/yyyy - HH:mm'),
        valor_total: "R$ " + String(item.valorTotal)
      }));
      this.UsedParkingSpots = list.filter((item: any) =>
        item.ativo &&
        !item.saida &&
        isToday(
          new Date(
            item.entrada[0],
            item.entrada[1],
            item.entrada[2],
            item.entrada[3],
            item.entrada[4],
            item.entrada[5]
          )
        )
      );
      console.log(list);
      console.log(this.OldMovimentations);
      console.log(this.UsedParkingSpots);
    },
    async DesocuparVaga() {

    }
  }
});
</script>
<template>
  <div class="home">
    <div class="row row-cols-1 row-cols-md-3 g-5 px-5 pt-3">
      <div class="col" v-for="(item) in UsedParkingSpots" :key="item.id">
        <div class="card">
          <div class="card-header">
            <a :href='"/condutor/asdasdasd"' class="list-group-item list-group-item-action">
              {{ item.condutor.nome }}
            </a>
          </div>
          <div class="list-group m-3">
            <a :href='"/veiculo/asdasdasd"' class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">
                  {{ item.veiculo.modelo.nome }} - {{ item.veiculo.ano }} | {{ item.veiculo.cor }}
                </p>
                <small>{{ format(new Date(
                  item.entrada[0],
                  item.entrada[1],
                  item.entrada[2],
                  item.entrada[3],
                  item.entrada[4],
                  item.entrada[5]
                ), 'dd/MM/yyyy - HH:mm') }}</small>
              </div>
              <small>{{ item.veiculo.placa }}</small>
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center w-100 mt-5">
        <p class="mb-0 mt-3">
          Nenhum Carro estacionado hoje !!!
        </p>
      </div>
    </div>
    <div class="container py-3 my-3">
      <Table :columns="columns" :data="OldMovimentations" :title="'Movimentações dos condutores hoje'" />
    </div>
  </div>
</template>
<style scoped>
.card {
  min-height: 172px !important;
}
</style>
