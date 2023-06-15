<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format, intervalToDuration } from "date-fns"
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
    name: "veiculo_nome"
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
export default defineComponent({
  name: 'HomeView',
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
  <div class="home">
    <div class="row row-cols-1 row-cols-md-3 g-5 px-5 pt-3">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <a href="/condutor/asdasdasd" class="list-group-item list-group-item-action">
              Nome do condutor
            </a>
          </div>
          <div class="list-group m-3">
            <a href="/veiculo/asdasdasd" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">Veiculo</p>
                <small>Tempo desconto</small>
              </div>
              <p class="mb-1">Modelo - Ano | Cor</p>
              <small>Placa</small>
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            <a href="/condutor/asdasdasd" class="list-group-item list-group-item-action">
              Nome do condutor
            </a>
          </div>
          <div class="list-group m-3">
            <a href="/veiculo/asdasdasd" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">Veiculo</p>
                <small>Tempo desconto</small>
              </div>
              <p class="mb-1">Modelo - Ano | Cor</p>
              <small>Placa</small>
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            <a href="/condutor/asdasdasd" class="list-group-item list-group-item-action">
              Nome do condutor
            </a>
          </div>
          <div class="list-group m-3">
            <a href="/veiculo/asdasdasd" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">Veiculo</p>
                <small>Tempo desconto</small>
              </div>
              <p class="mb-1">Modelo - Ano | Cor</p>
              <small>Placa</small>
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            <a href="/condutor/asdasdasd" class="list-group-item list-group-item-action">
              Nome do condutor
            </a>
          </div>
          <div class="list-group m-3">
            <a href="/veiculo/asdasdasd" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">Veiculo</p>
                <small>Tempo desconto</small>
              </div>
              <p class="mb-1">Modelo - Ano | Cor</p>
              <small>Placa</small>
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            <a href="/condutor/asdasdasd" class="list-group-item list-group-item-action">
              Nome do condutor
            </a>
          </div>
          <div class="list-group m-3">
            <a href="/veiculo/asdasdasd" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <p class="mb-1 text-left">Veiculo</p>
                <small>Tempo desconto</small>
              </div>
              <p class="mb-1">Modelo - Ano | Cor</p>
              <small>Placa</small>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-3 my-3">
      <Table :columns="columns" :data="data" :title="'Movimentações'" />
    </div>
  </div>
</template>
<style scoped>
.card {
  min-height: 172px !important;
}
</style>
