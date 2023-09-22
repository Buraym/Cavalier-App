<script lang="ts">
import { defineComponent, } from 'vue';
import { format } from "date-fns"
import { retornar_movimentacao, editar_movimentacao, deletar_movimentacao } from '@/controllers/movimentacao';
import { delete_user, edit_user, return_user } from '@/controllers/users';
export default defineComponent({
    name: 'EditUser',
    data: () => {
        return {
            email: "",
            password: "",
            name: "",
            active: true,
            role: "user",
            document: "",
            contact: "",
            date_created: "",
            date_updated: "",
        }
    },
    mounted() {
        this.ReturnUser();
    },
    methods: {
        async ReturnUser() {
            const data = await return_user(String(this.$route.params.user_id));
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
            this.role = data.role;
            this.document = data.document;
            this.contact = data.contact;
            this.active = data.ativo ? true : false;
            this.date_created = format(new Date(data.created_at), "dd/MM/yyyy HH:mm")
            if (data.atualizacao) {
                this.date_updated = format(new Date(data.updated_at), "dd/MM/yyyy HH:mm")
            }
        },
        async EditUser(event: any) {
            event.preventDefault();
            const data = await return_user(String(this.$route.params.user_id))
            await edit_user(String(this.$route.params.user_id), {
                ...data,
                nome: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
                document: this.document,
                contact: this.contact,
            });
            this.$router.go(-1);
        },
        async DeleteUser() {
            await delete_user(String(this.$route.params.user_id));
            this.$router.push("/users")
        }
    }
});
</script>
<template>
    <div class="user-edit">
        <div class="container text-start">
            <form @submit="EditUser">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path
                                    d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                            </svg>
                            Update
                        </button>
                        <button type="button" class="btn btn-danger" @click="DeleteUser">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                                </path>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
                <div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Complete name</span>
                            <input type="text" v-model="name" class="form-control" aria-label="Complete name"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                            <input type="email" v-model="email" class="form-control" placeholder="Email"
                                aria-label="Hora Saída" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="password-field-label">Password</span>
                            <input type="password" v-model="password" min="8" class="form-control" aria-label="Password"
                                aria-describedby="password-field-label">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Document number</span>
                            <input type="text" v-model="document" class="form-control" aria-label="Numero do documento"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Contato</span>
                            <input type="text" v-model="contact" class="form-control" placeholder="Contato"
                                aria-label="Hora Saída" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <div class="form-check">
                            <input v-model="active" class="form-check-input" type="checkbox" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Active ?
                            </label>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <h5 v-if="date_created !== ''" class="mb-0">Created at: <span class="badge text-bg-warning">{{
                                date_created }}</span>
                            </h5>
                            <h5 v-if="date_updated !== ''" class="mb-0">Editado em: <span class="badge text-bg-warning">{{
                                date_updated }}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.user-edit {
    padding: 30px;
}
</style>