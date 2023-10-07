<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format, intervalToDuration, isToday } from "date-fns";
import { CalcTotalTime, getLocalisedMessage } from '@/utils';
import {
  retornar_configuracao
} from "@/controllers/configuracao";
import {
  retornar_movimentacao,
  listar_movimentacoes,
  deletar_movimentacao,
  editar_movimentacao,
  get_total_day_value
} from "@/controllers/movimentacao";
import Table from '@/components/Table.vue';
import { ExportDailyMovimentations } from "@/reports/excel"
import { GenerateServerReport, IConfig } from '@/reports/server';
const listHeaderTopics: any[] = [
  {
    label: "ID",
    field: "main.index.table-id-header"
  },
  {
    label: "Nome",
    field: "main.index.table-name-header"
  },
  {
    label: "CPF",
    field: "main.index.table-cpf-header"
  },
  {
    label: "Veiculo",
    field: "main.index.table-vehicle-header",
    is_link: true
  },
  {
    label: "Hora entrada",
    field: "main.index.table-entertime-header"
  },
  {
    label: "Hora saida",
    field: "main.index.table-leavetime-header"
  },
  {
    label: "Valor total",
    field: "main.index.table-total-value"
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
      this.config = await retornar_configuracao();
      if (String(this.$i18n.locale) !== "pt") {
        this.columns = [
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-id-header")),
            field: "main.index.table-id-header"
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-name-header")),
            field: "main.index.table-name-header"
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-cpf-header")),
            field: "main.index.table-cpf-header"
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-vehicle-header")),
            field: "main.index.table-vehicle-header",
            is_link: true
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-entertime-header")),
            field: "main.index.table-entertime-header"
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "table-leavetime-header")),
            field: "main.index.table-leavetime-header"
          },
          {
            label: String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "main.index.table-total-value")),
            field: "main.index.table-total-value"
          }
        ]
      }
    },
    async RetornarVagas() {
      const list = await listar_movimentacoes();
      const date_format_localised = {
        pt: {
          "dia(s)": "",
          "hora(s)": "Hora(s)",
          "minuto(s)": "Minuto(s)",
        },
        en: {
          "dia(s)": "Day(s)",
          "hora(s)": "Hour(s)",
          "minuto(s)": "Minute(s)",
        },
        es: {
          "dia(s)": "Dia(s)",
          "hora(s)": "Hora(s)",
          "minuto(s)": "Minuto(s)",
        },
      }
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
        veiculo_nome: String(item.veiculo.modelo.nome) + " " + String(item.veiculo.ano),
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
        id: item.id,
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
        }).days} ${String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "vacancy-duration-days"))}, ${intervalToDuration({
          start: new Date(
            item.entrada
          ), end: new Date()
        }).hours} ${String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "vacancy-duration-hours"))} e ${intervalToDuration({
          start: new Date(
            item.entrada
          ), end: new Date()
        }).minutes} ${String(getLocalisedMessage(String(this.$i18n.locale), "main", "index", "vacancy-duration-minutes"))}`,
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
      const saida_time = new Date();
      const movimentacao = await retornar_movimentacao(id);
      let calculatedData = CalcTotalTime({
        entrada: new Date(movimentacao.entrada),
        saida: saida_time,
      }, this.config, null);
      await editar_movimentacao(String(id), {
        ativo: true,
        condutor_id: movimentacao.condutor.id,
        veiculo_id: movimentacao.veiculo.id,
        entrada: new Date(movimentacao.entrada),
        saida: saida_time,
        tempo: calculatedData.tempo,
        tempo_desconto: calculatedData.tempo_desconto,
        tempo_multa: calculatedData.tempo_multa,
        valor_desconto: calculatedData.valor_desconto,
        valor_multa: calculatedData.valor_multa,
        valor_total: calculatedData.valor_total,
        valor_hora: calculatedData.valor_hora,
        valor_hora_multa: calculatedData.valor_hora_multa,
      });
      await this.RetornarVagas();
    },
    async ExportReportExcel() {
      const totalDayValue = await get_total_day_value();
      await ExportDailyMovimentations(
        {
          "title": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "title")),
          "driver": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "driver")),
          "vehicle": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "vehicle")),
          "enter-time": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "enter-time")),
          "exit-time": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "exit-time")),
          "total": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "total")),
          "total-amount": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "total-amount")),
          "no-file-selected": String(getLocalisedMessage(String(this.$i18n.locale), "general", "index", "no-file-selected")),
          "file-to": String(getLocalisedMessage(String(this.$i18n.locale), "general", "index", "file-to")),
          "file-saved": String(getLocalisedMessage(String(this.$i18n.locale), "general", "index", "file-saved")),
          "file-cannot-be-saved": String(getLocalisedMessage(String(this.$i18n.locale), "general", "index", "file-cannot-be-saved"))
        },
        {
          date: format(new Date(), "dd/MM/yyyy - HH:mm:ss"),
          movimentations: this.OldMovimentations.map((item) => {
            return [
              {
                v: String(item.id), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" },
                  font: {
                    bold: true,
                  }
                }
              },
              {
                v: String(item.name), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" }
                }
              },
              {
                v: String(item.veiculo_nome), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" }
                }
              },
              {
                v: String(item.entrada), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" }
                }
              },
              {
                v: String(item.saida), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" }
                }
              },
              {
                v: String(item.valor_total), t: "s",
                s: {
                  border: {
                    left: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    right: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    top: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    },
                    bottom: {
                      style: "thick",
                      color: { rgb: "0c0c0c" }
                    }
                  },
                  alignment: { vertical: "center", horizontal: "center" }
                }
              },
            ];
          }),
          total: Number(totalDayValue).toFixed(2),
        }
      );
    },
    async ExportServerReport() {
      const config: IConfig = {
        format: "pdf",
        type: "daily"
      }
      const totalDayValue = await get_total_day_value();
      console.log(totalDayValue);
      let list = (await listar_movimentacoes()).filter((item: any) =>
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
        veiculo_nome: String(item.veiculo.modelo.nome) + " " + String(item.veiculo.ano),
        entrada: format(new Date(
          item.entrada
        ), 'dd/MM/yyyy - HH:mm'),
        saida: item.saida ? format(new Date(
          item.saida
        ), 'dd/MM/yyyy - HH:mm') : "Sem saída",
        valor_total: "R$ " + Number(item.valor_total).toFixed(2),
        total: item.valor_total
      }));
      const data: any = {
        "locale": {
          "report-title": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "title")),
          "driver": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "driver")),
          "vehicle": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "vehicle")),
          "enter-time": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "enter-time")),
          "exit-time": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "exit-time")),
          "total": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "total")),
          "total-amount": String(getLocalisedMessage(String(this.$i18n.locale), "reports", "files", "daily-movimentation", "total-amount")),
        },
        "movimentations":
          list.map((item) => ({
            id: String(item.id),
            driver: String(item.name),
            vehicle: String(item.veiculo_nome),
            enter_time: String(item.entrada),
            exit_time: String(item.saida),
            total: String(item.total)
          })),
        "total-amount": `R$ ${totalDayValue}`,
      }
      const reportData = await GenerateServerReport(
        config,
        data
      );
      console.log(reportData);
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
            <button type="button" @click="EncerrarEstacionamento(item.id)" class="btn btn-warning text-white"
              :title='$t("main.index.finish-vacancy")'>
              <i class="bi bi-explicit-fill"></i>
            </button>
          </div>
          <div class="w-100 d-flex justify-content-between px-3 mb-1">
            <small>{{ $t("main.index.vacancy-entertime") }}{{ item.entrada }}</small>
            <small>{{ item.duracao }}</small>
          </div>
        </div>
      </div>
    </div>
    <div v-if="OldMovimentations.length > 0" class="container py-3 my-3">
      <Table :columns="columns" :data="OldMovimentations" :title='$t("main.index.todays-movimentations")'
        :edit="String(/movimentacao/)" :remove="DeletarItem" :export-function="ExportReportExcel"
        :export-function-pdf="ExportServerReport" />
    </div>
  </div>
</template>
<style scoped>
.home {
  padding: 30px;
}

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
  min-width: 41px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}
</style>
