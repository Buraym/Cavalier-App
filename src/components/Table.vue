<script lang="ts">
import { defineComponent, PropType } from 'vue';
export interface ITableColumn {
    field: String,
    label: String,
    numeric?: boolean,
    centered?: boolean,
    is_link?: boolean | false,
    link?: String | "";
    actions?: boolean | false,
}
export interface ITableData {
    id: string,
    [x: string]: any;
}
export default defineComponent({
    name: 'Table',
    props: {
        title: String || undefined,
        data: Object as PropType<ITableData[]>,
        columns: Object as PropType<ITableColumn[]>
    }
});
</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover table-borderless table-sm">
            <thead>
                <tr v-if="title">
                    <th v-bind:colspan="columns?.length" class="text-center">
                        {{ title }}
                    </th>
                </tr>
                <tr class="table-header">
                    <th v-for="(header, indexHeader) in columns" :key="indexHeader" scope="col" style="text-align: center;">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(item) in data" :key="item.id">
                    <td v-for="(value, key, index) in item" :key="index" style="text-align: center;">
                        <p class="mb-0" :href="item.link"
                            v-if="columns?.findIndex((obj) => obj.actions) !== -1 && key === 'actions'" v-html="value">
                        </p>
                        <p class="mb-0" v-else-if="key !== 'actions'">
                            {{ value }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-header {
    background: #ffc107 !important
}

th {
    text-align: center;
    font-weight: bold;
    border-bottom: none;
    vertical-align: middle
}

td {
    text-align: left;
    vertical-align: middle
}
</style>