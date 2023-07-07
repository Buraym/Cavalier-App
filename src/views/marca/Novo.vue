<script lang="ts">
import { defineComponent } from 'vue';
import { criar_marca } from '@/utils/database';
export default defineComponent({
    name: 'CadastroMarca',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            nome: "",
        }
    },
    methods: {
        async EnviarFormulario(event: any) {
            event.preventDefault();
            await criar_marca({ nome: this.nome });
            this.$router.push('/marca');
        }
    }
});
</script>
<template>
    <div class="cadastro-marca">
        <div class="container text-start">
            <form v-on:submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Marca</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome da Marca</span>
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome da Marca"
                            aria-label="Nome da Marca" aria-describedby="basic-addon1" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">Cadastrar marca</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cadastro-marca {
    padding: 30px;
}
</style>