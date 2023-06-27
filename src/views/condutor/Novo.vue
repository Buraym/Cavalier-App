<script lang="ts">
import { defineComponent } from 'vue';
import { format } from "date-fns"
export default defineComponent({
    name: 'CadastroCondutor',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            name: "",
            cpf: "",
            telefone: ""
        }
    },
    methods: {
        EnviarFormulario(event: any) {
            event.preventDefault();
            console.log(this.name, this.cpf, this.telefone);
            const data_cadastro = format(new Date, "dd/MM/yyyy HH:MM");
            const data_atualizado = format(new Date, "dd/MM/yyyy HH:MM");
        }
    }
});
</script>
<template>
    <div class="cadastro-condutor">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Condutor</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome Completo</span>
                        <input type="text" v-model="name" class="form-control" placeholder="Nome" aria-label="Nome"
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">CPF</span>
                        <input type="text" v-model="cpf" class="form-control" placeholder="CPF" aria-label="CPF"
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefone</span>
                        <input type="text" v-model="telefone" class="form-control" placeholder="Telefone"
                            aria-label="Telefone" aria-describedby="basic-addon1" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">Cadastrar condutor</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cadastro-condutor {
    padding: 30px;
}
</style>