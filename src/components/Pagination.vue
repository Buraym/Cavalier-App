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
    role?: 'admin' | 'user',
    [x: string]: any;
}

export default defineComponent({
    name: 'Pagination',
    props: {
        page: Number,
        perPage: Number,
        items: Number,
        pages: Number,
        listFunction: Function,
    },
    methods: {
        async list(page: Number, perPage: Number) {
            await this.listFunction!(page, perPage);
        }
    }
});
</script>

<template>
    <div class="d-flex w-100 justify-content-end" v-bind:class="{ 'mt-2': Number(pages) === 0 }">
        <nav class="d-flex w-100 justify-content-between" aria-label="Page navigation example">
            <div class="d-flex align-items-center mx-2">
                Exibindo
                <!-- @vue-ignore -->
                <select @change="(ev: Event) => list(Number(page), Number(ev?.target?.value))"
                    class="form-select form-select-sm mx-2 mb-1" aria-label="Small select example">
                    <option value="5" v-bind:selected="perPage === 5">5</option>
                    <option value="10" v-bind:selected="perPage === 10">10</option>
                    <option value="20" v-bind:selected="perPage === 20">20</option>
                    <option value="50" v-bind:selected="perPage === 50">50</option>
                </select> de <strong class="mx-1"> {{ items }} </strong>
            </div>
            <ul class="pagination mt-2">
                <li class="page-item" v-if="Number(pages) > 1" style="border-right: none">
                    <button v-bind:disabled="page === 1" v-bind:class="{ active: page === 1 }"
                        class="page-link warning-color mx-0" style="border-right: none" aria-label="Previous"
                        @click="list(1, Number(perPage))">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li v-for="pageList in pages" key="pageList" class="page-item"
                    style="border-left: none; border-right: none">
                    <button v-bind:class="{ active: page === pageList }" class="page-link warning-color mx-0"
                        style="border-left: none; border-right: none" @click="list(pageList, Number(perPage))">
                        {{ pageList }}
                    </button>
                </li>
                <li class="page-item" v-if="Number(pages) > 1" style="border-left: none">
                    <button v-bind:disabled="page === pages" v-bind:class="{ active: page === pages }"
                        :class="`page-link warning-color mx-0`" style="border-left: none" aria-label="Next"
                        @click="list(Number(pages), Number(perPage))">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.warning-color {
    background: #FFF;
    color: #ffc107;
    transition: 250ms ease-in-out;
}

.warning-color:hover {
    background: #ffe38e;
    color: #FFF !important;
}

.warning-color.active {
    border-color: #dee2e6 !important;
    background: #ffc107 !important;
    color: #FFF !important;
}
</style>