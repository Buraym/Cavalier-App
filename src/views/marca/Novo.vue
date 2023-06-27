<script lang="ts">
import { defineComponent } from 'vue';
import { format } from "date-fns"
import { MarcaClient } from '@/client/marca.client';
export default defineComponent({
    name: 'EdicaoMarca',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            name: "",
        }
    },
    methods: {
        async EnviarFormulario(event: any) {
            event.preventDefault();
            console.log(this.name);
            const data_cadastro = format(new Date, "dd/MM/yyyy HH:MM");
            const data_atualizado = format(new Date, "dd/MM/yyyy HH:MM");
            const client = new MarcaClient();
            await client.create({ name });
            // this.$router.push('/marca')
        }
    }
});
</script>
<template>
    <div class="edicao-marca">
        <div class="container text-start">
            <form v-on:submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Marca</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome da Marca</span>
                        <input type="text" v-model="name" class="form-control" placeholder="Nome da Marca"
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
.edicao-marca {
    padding: 30px;
}
</style>