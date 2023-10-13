<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useUsersStore } from '../stores/index';

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
    role?: 'admin' | 'user',
    [x: string]: any;
}

export default defineComponent({
    name: 'Table',
    data() {
        return {
            usersStore: useUsersStore()
        }
    },
    props: {
        title: String || undefined,
        data: Object as PropType<ITableData[]>,
        columns: Object as PropType<ITableColumn[]>,
        edit: String,
        remove: Function,
        changeAuth: Function,
        exportFunction: Function
    }
});
</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover table-borderless table-sm">
            <thead>
                <tr v-if="title">
                    <th v-bind:colspan="Number(columns?.length)" class="text-start">
                        {{ title }}
                    </th>
                    <th class="text-end">
                        <button class='btn btn-outline-primary' v-if="exportFunction"
                            @click="exportFunction && exportFunction()" :title="$t('general.index.export-excel')">
                            <i class="bi bi-file-earmark-spreadsheet-fill"></i>
                        </button>
                    </th>
                </tr>
                <tr class="table-header">
                    <th v-for="(header, indexHeader) in columns" :key="indexHeader" scope="col" style="text-align: center;">
                        {{ $t(`${header.field}`) }}
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(item) in data" :key="item.id">
                    <td v-for="(value, key, index) in item" :key="index" style="text-align: center;">
                        <p class="mb-0" :href="item.link"
                            v-if="columns?.findIndex((obj) => obj.actions) !== -1 && key === 'actions'" v-html="value">
                        </p>
                        <p class="mb-0" v-else-if="key !== 'actions'">
                            {{ key === "role" ? $t(`users.list.role-${value}`) : value }}
                        </p>
                    </td>
                    <td style="text-align: center;">
                        <div class='d-flex justify-content-end align-items-center gap-2'>
                            <router-link class='btn btn-warning' :to="`${edit}${item.id}`" title="Edit resource">
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                    class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                                </svg>
                            </router-link>
                            <button class='btn btn-danger'
                                v-if="(changeAuth && String(usersStore.$state.user?.id) !== String(item.id)) || (remove && !changeAuth)"
                                @click='remove && remove(item.id)' title="Delete resource">
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                    class='bi bi-trash-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
                                </svg>
                            </button>
                            <button class='btn btn-danger'
                                v-if="changeAuth && String(usersStore.$state.user?.id) !== String(item.id)"
                                @click='changeAuth && changeAuth(item.id, item.role === "admin" ? "user" : "admin")'
                                :title="item.role === 'admin' ? `Lower this user's authority` : `Raise this user's authority`">
                                <i class="bi bi-lock-fill" v-if="item.role === 'admin'"></i>
                                <i class="bi bi-unlock-fill" v-if="item.role === 'user'"></i>
                            </button>
                        </div>
                    </td>
                    <td style="text-align: center;">
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