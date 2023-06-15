<script lang="ts">
import { defineComponent, PropType } from 'vue';
export interface ITableColumn {
    field: String,
    label: String,
    width?: String | Number,
    numeric?: boolean,
    centered?: boolean;
}
export interface ITableData {
    id: string,
    [x: string]: any;
}
export default defineComponent({
    name: 'Table',
    props: {
        title: String || undefined,
        data: Object as PropType<ITableData[] | []>,
        columns: Object as PropType<ITableColumn[] | []>
    }
});
</script>

<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr v-if="title">
                <th v-bind:colspan="columns?.length" class="text-center">
                    {{ title }}
                </th>
            </tr>
            <tr>
                <th v-for="(header, index) in columns" :key="index" scope="col">
                    {{ header.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in data" :key="item.id">
                <td v-for="(value) in item" style="text-align: left;">
                    {{ value }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
th {
    text-align: left;
    font-weight: bold
}

td {
    text-align: left;
    vertical-align: middle
}
</style>