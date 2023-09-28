<script lang="ts">
import { defineComponent } from 'vue';
// import DougnhnutChart from '@/components/DougnhnutChart.vue';
import Table from '@/components/Table.vue';
import { listar_movimentacoes_deste_mes } from '@/controllers/movimentacao';
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
        }
    },
    components: {
        Table,
    },
    mounted() {
        this.RetornarMovimentacoes();
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
            )
        },
    }
});
</script>
<template>
    <div class="relatorios">
        <div class="container">
            <div class="row w-100 row-gap-2 flex-wrap">
                <div class="col-md-4 col-sm-12 col-sx-12">
                    <div class="card">
                        <h5 class="card-header text-start">{{ $t("reports.index.monthly-resuls") }}</h5>
                        <div class="card-body d-flex flex-column gap-1">
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
                            </ul>
                            <p class="btn w-100 btn-outline-warning"><strong>R$ {{ total_value }}</strong></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12 col-sx-12">
                    <div class="card chart-card">
                        <div class="card-body d-flex justify-content-between">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.relatorios {
    padding: 30px;
}

.chart-card {
    height: 220px
}
</style>