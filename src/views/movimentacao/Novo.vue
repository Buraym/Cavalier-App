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
                    <h2>Cadastro de Movimentação</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Condutor</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma condutor</option>
                            <option value="1">André</option>
                            <option value="2">Giovanna</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Veiculo</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Escolha uma veiculo</option>
                            <option value="1">Civic</option>
                            <option value="2">Camaro</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Hora Entrada</span>
                            <input type="time" class="form-control" placeholder="Hora Entrada" aria-label="Hora Entrada"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Hora Saída</span>
                            <input type="time" class="form-control" placeholder="Hora Saída" aria-label="Hora Saída"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo total decorrido</span>
                            <input type="time" class="form-control" placeholder="Tempo total decorrido"
                                aria-label="Tempo total decorrido" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo desconto</span>
                            <input type="time" class="form-control" placeholder="Tempo desconto" aria-label="Tempo desconto"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tempo multa</span>
                            <input type="time" class="form-control" placeholder="Tempo multa" aria-label="Tempo multa"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor desconto (R$)</span>
                            <input type="text" class="form-control" placeholder="Valor desconto" aria-label="Valor desconto"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor multa (R$)</span>
                            <input type="text" class="form-control" placeholder="Valor multa" aria-label="Valor multa"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor unitario por hora (R$)</span>
                            <input type="text" class="form-control" placeholder="Valor unitario por hora"
                                aria-label="Valor unitario por hora" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Valor total (R$)</span>
                            <input type="text" class="form-control" placeholder="Valor total" aria-label="Valor total"
                                aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="button" class="btn btn-warning w-100">Cadastrar
                            movimentação</button>
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