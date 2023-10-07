<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import { listar_movimentacoes_deste_mes } from '@/controllers/movimentacao';
import { list_monthly_reports } from '@/controllers/reports';
import format from 'date-fns/format';
import { ExportDailyMovimentations } from '@/reports/excel';
let monthlyReports = ref<any[] | []>([]);
export default defineComponent({
    name: 'Relatorio',
    data: () => {
        return {
            qty: "",
            total_hours: "",
            total_minutes: "",
            total_vehicles: "",
            total_drivers: "",
            total_value: "",
            monthlyReports
        }
    },
    components: {
        Table,
    },
    mounted() {
        this.RetornarMovimentacoes();
        this.ReturnReports();
    },
    methods: {
        async RetornarMovimentacoes() {
            let data = await listar_movimentacoes_deste_mes()
            let list_vehicle_id = data.map((item) => item.veiculo.id);
            let list_driver_id = data.map((item) => item.condutor.id);
            this.qty = String(data.length);
            this.total_hours = String(Math.floor(Number(data.reduce((acc, curr) => {
                acc += Number(curr.tempo)
                return acc;
            }, 0)) / 60));
            this.total_minutes = String(Number(data.reduce((acc, curr) => {
                acc += Number(curr.tempo)
                return acc;
            }, 0)) % 60);
            this.total_vehicles = String(
                list_vehicle_id.filter((id, index) => list_vehicle_id.indexOf(id) === index).length
            );
            this.total_drivers = String(
                list_driver_id.filter((id, index) => list_driver_id.indexOf(id) === index).length
            );
            this.total_value = String(
                data.reduce((acc, curr) => {
                    acc += Number(curr.valor_total);
                    return acc;
                }, 0)
            );
        },
        async ReturnReports() {
            let data = await list_monthly_reports();
            this.monthlyReports = data.map((item) => ({
                date: format(new Date(item.created_at), item.model === "dailyMovimentations" ? "dd/MM/yyyy" : "MM/yyyy"),
                model: String(item.model),
                format: String(item.format).toUpperCase(),
                file_data: item.file_data,
                link: String(item.link)
            }))

        },
        async ReDownloadReports(type: String, file_data: any) {
            let data = JSON.parse(file_data);
            if (type === "dailyMovimentations") {
                await ExportDailyMovimentations(data.locale, data.data);
            }
        }
    }
});
</script>
<template>
    <div class="relatorios">
        <div class="container">
            <div class="row w-100 row-gap-2 flex-wrap">
                <div class="col-xl-4 col-md-12 col-sm-12 col-sx-12">
                    <div class="card h-100">
                        <h5 class="card-header text-start">{{ $t("reports.index.monthly-resuls") }}</h5>
                        <div class="card-body d-flex justify-content-between flex-column gap-1">
                            <ul>
                                <li class="text-start">
                                    <p class="mb-0">
                                        <strong>{{ qty }}</strong> {{ $t("reports.index.total-movimentations") }}
                                    </p>
                                </li>
                                <li class="text-start">
                                    <p class="mb-0">
                                        <strong>{{ total_hours }}</strong> {{ $t("reports.index.total-hours") }}
                                        <strong>{{ total_minutes }}</strong>
                                        {{ $t("reports.index.total-minutes") }}
                                    </p>
                                </li>
                                <li class="text-start">
                                    <p class="mb-0">
                                        <strong>{{ total_vehicles }}</strong>
                                        {{ $t("reports.index.total-vehicles") }}<strong>
                                            {{ total_drivers }}</strong> {{ $t("reports.index.total-drivers") }}
                                    </p>
                                </li>
                                <li class="text-start">
                                    <p class="mb-0">
                                        <strong>R$ {{ total_value }}</strong>
                                        {{ $t("reports.index.total-ammount") }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8 col-md-12 col-sm-12 col-sx-12">
                    <div class="card  h-100">
                        <h5 class="card-header text-start">{{ $t("reports.index.reports-list") }}</h5>
                        <div class="card-body d-flex gap-1" v-bind:class="{ rollable: monthlyReports.length >= 1 }">
                            <div class="card report-card" v-if="monthlyReports.length >= 1" v-for="(item) in monthlyReports"
                                :key="item.id">
                                <h6 class="card-header d-flex justify-content-between text-start gap-2">
                                    {{ $t(`reports.index.${item.model}`) }}
                                    <span class="badge text-bg-warning d-flex align-items-center">{{ item.date }}</span>
                                </h6>
                                <div class="card-body d-flex flex-column justify-content-center align-items-start gap-2">
                                    <!-- <div class="w-100 d-flex justify-content-center align-items-center">
                                        Formato: {{ item.format }}
                                    </div> -->
                                    <div class="w-100 d-flex justify-content-center align-items-center">
                                        <button class="btn btn-warning w-100"
                                            @click="ReDownloadReports(item.model, item.file_data)">
                                            Download <i class="bi bi-download"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-center w-100 h-100" v-else>
                                <strong>
                                    {{ $t("reports.index.no-reports") }}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.rollable {
    overflow-x: scroll
}

.relatorios {
    padding: 30px;
}

.report-card {
    min-width: 300px;
}
</style>