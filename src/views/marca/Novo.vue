<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
const data_cadastro = format(new Date, "dd/MM/yyyy HH:MM");
const data_atualizado = format(new Date, "dd/MM/yyyy HH:MM");
export default defineComponent({
    name: 'EdicaoMarca',
    data: () => {
        return {
            data_cadastro,
            data_atualizado,
        }
    }
});
</script>
<template>
    <div class="edicao-marca">
        <div class="container text-start">
            <form>
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Marca</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome da Marca</span>
                        <input type="text" class="form-control" placeholder="Nome da Marca" aria-label="Nome da Marca"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal"
                            data-bs-target="#deletemodal">Cadastrar marca</button>
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