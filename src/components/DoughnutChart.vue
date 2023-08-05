<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Chart from 'chart.js/auto'
export interface IDoughnutDataSet {
    label: String,
    data: Number[] | Number,
    backgroundColor: Array<"#FFC107" | "#F15025" | "#2D2D2A" | "#CC9900" | "#FFD65C" | "#F47552" | "#9BC1BC" | "#35CE8D" | "#4A314D">,
}
export interface IDoughnutChartData {
    labels: String[],
    datasets: IDoughnutDataSet[],
    options: any
}
export default defineComponent({
    name: 'DoughnutChart',
    data: () => {
        return {
            id: String(new Date().valueOf())
        }
    },
    mounted() {
        // @ts-ignore
        new Chart(document.getElementById('doughnut-' + String(this.id)), { type: this.type, data: this.data, options: this.options });
    },
    props: {
        type: String,
        data: Object as PropType<IDoughnutChartData[]>,
        options: Object
    }
});
</script>

<template>
    <div>
        <div>
            <canvas :id="'doughnut-' + id"></canvas>
        </div>
    </div>
</template>

<style scoped></style>