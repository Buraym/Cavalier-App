<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CadastroCondutor',
});
</script>
<template>
    <div class="cadastro-condutor">
        <div class="container text-start">
            <form>
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Condutor</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome Completo</span>
                        <input type="text" class="form-control" placeholder="Nome" aria-label="Nome"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">CPF</span>
                        <input type="text" class="form-control" placeholder="CPF" aria-label="CPF"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefone</span>
                        <input type="text" class="form-control" placeholder="Telefone" aria-label="Telefone"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal"
                            data-bs-target="#deletemodal">Cadastrar condutor</button>
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