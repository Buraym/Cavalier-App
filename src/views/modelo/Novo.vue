<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CadastroModelo',
});
</script>
<template>
    <div class="cadastro-modelo">
        <div class="container text-start">
            <form>
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Modelo</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome do Modelo</span>
                        <input type="text" class="form-control" placeholder="Nome da Modelo" aria-label="Nome da Modelo"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Marca</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma marca</option>
                            <option value="1">Honda</option>
                            <option value="2">Chevrolet</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal"
                            data-bs-target="#deletemodal">Cadastrar modelo</button>
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