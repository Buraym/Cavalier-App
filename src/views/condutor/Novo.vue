<script lang="ts">
import { CondutorClient } from '@/client/condutor.client';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CadastroCondutor',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            nome: "",
            cpf: "",
            telefone: ""
        }
    },
    methods: {
        async EnviarFormulario(event: any) {
            event.preventDefault();
            const client = new CondutorClient();
            await client.create({
                nome: this.nome,
                cpf: this.cpf,
                telefone: this.telefone
            })
            this.$router.push("/condutor");
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
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome" aria-label="Nome"
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">CPF</span>
                        <input type="text" v-model="cpf" class="form-control" placeholder="CPF" aria-label="CPF"
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefone</span>
                        <input type="text" v-model="telefone" class="form-control" min="17" max="17"
                            placeholder="55 XX X XXXX-XXXX" aria-label="Telefone" aria-describedby="basic-addon1" required>
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