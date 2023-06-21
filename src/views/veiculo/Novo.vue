<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CadastroVeiculo',
});
</script>
<template>
    <div class="cadastro-veiculo">
        <div class="container text-start">
            <form>
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Veiculo</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Placa do veiculo</span>
                        <input type="text" class="form-control" placeholder="Placa do veiculo" aria-label="Placa do veiculo"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Ano da versão</span>
                        <input type="text" class="form-control" placeholder="Ano da versão" aria-label="Ano da versão"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Modelo</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma modelo</option>
                            <option value="1">Civic</option>
                            <option value="2">Camaro</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Cor</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma cor</option>
                            <option value="RED">Vermelho</option>
                            <option value="GREEN">Verde</option>
                            <option value="BLUE">Azul</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Tipo de Veiculo</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma tipo</option>
                            <option value="CARRO">Carro</option>
                            <option value="MOTO">Moto</option>
                            <option value="VAN">Van</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal"
                            data-bs-target="#deletemodal">Cadastrar veiculo</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cadastro-veiculo {
    padding: 30px;
}
</style>