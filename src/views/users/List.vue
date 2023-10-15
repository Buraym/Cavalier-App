<script lang="ts">
import { defineComponent, ref } from 'vue';
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { format } from 'date-fns';
import { delete_user, list_users_paginated, return_user, switch_user_role } from '@/controllers/users';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
const listHeaderTopics: any[] = [
    {
        label: "ID",
        field: "users.list.table-id-header"
    },
    {
        label: "Nome Completo",
        field: "users.list.table-name-header"
    },
    {
        label: "Role",
        field: "users.list.table-role-header"
    },
    {
        label: "Created at",
        field: "users.list.table-created-at-header"
    }
]
const data = ref<any[] | []>([]);
const toast = useToast();
export default defineComponent({
    name: 'UsersList',
    data: () => {
        return {
            data,
            items: 1,
            page: 1,
            pages: 1,
            perPage: 5,
            columns: listHeaderTopics
        }
    },
    components: {
        Table,
        Pagination
    },
    mounted() {
        this.ListagemDeItens();
    },
    methods: {
        async ListagemDeItens(page?: Number, perPage?: Number) {
            try {
                const response = await list_users_paginated(Number(page ? page : this.page), 20);
                this.pages = Number(response.totalPages);
                this.items = Number(response.totalItems);
                if (perPage) {
                    this.perPage = Number(perPage);
                }
                // @ts-ignore
                this.data = response?.results?.map((item) => ({
                    id: item.id,
                    nome: item.name,
                    role: item.role,
                    created_at: format(new Date(
                        item.created_at
                    ), "dd/MM/yyyy - HH:mm"),
                }));
                if (page) {
                    this.page = Number(page);
                }
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-users")),
                    { id: "return-users" }
                )
            }
        },
        updateColumnHeadersLocalization() {
            if (String(this.$i18n.locale) !== "pt") {
                this.columns = [
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "users", "list", "table-id-header")),
                        field: "users.list.table-id-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "users", "list", "table-name-header")),
                        field: "users.list.table-name-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "users", "list", "table-role-header")),
                        field: "users.list.table-role-header"
                    },
                    {
                        label: String(getLocalisedMessage(String(this.$i18n.locale), "users", "list", "table-created-at-header")),
                        field: "users.list.table-created-at-header"
                    }
                ]
            }
        },
        async DeletarItem(id: string) {
            try {
                await delete_user(id);
                this.data = this.data.filter((item: { id: string; }) => item.id !== id);
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "remove-user")),
                    { id: "remove-user" }
                )
            }

        },
        async SwitchAuthorityRole(id: string, role: 'admin' | 'user') {
            try {
                await switch_user_role(id, role);
                await this.ListagemDeItens();
                let user = await return_user(id);
                toast.info(
                    `${String(getLocalisedMessage(String(this.$i18n.locale), "warning", "index", `switch-auth-user-${role}`))} ${user.name}`,
                    { id: `switch-auth-user-${role}` }
                )
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "switch-auth-user")),
                    { id: "switch-auth-user" }
                )
            }

        }
    }
});
</script>
<template>
    <div class="listagem-movimentacao">
        <Table :columns="columns" :data="data" :edit="String('/user/')" :remove="DeletarItem"
            :change-auth="SwitchAuthorityRole" />
        <Pagination :page="page" :pages="pages" :per-page="perPage" :items="items" :list-function="ListagemDeItens" />
    </div>
</template>
<style scoped>
.form-select-sm {
    height: 28px;
}

.listagem-movimentacao {
    padding: 30px;
}
</style>