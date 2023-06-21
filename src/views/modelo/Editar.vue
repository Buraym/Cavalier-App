<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
const data_cadastro = format(new Date, "dd/MM/yyyy HH:MM");
const data_atualizado = format(new Date, "dd/MM/yyyy HH:MM");
export default defineComponent({
    name: 'EdicaoModelo',
    data: () => {
        return {
            data_cadastro,
            data_atualizado,
        }
    }
});
</script>
<template>
    <div class="edicao-modelo">
        <div class="container text-start">
            <form>
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>ID: {{ $route.params.condutor_id }}</h2>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                            Atualizar
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-person-x" viewBox="0 0 16 16">
                                <path
                                    d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                <path
                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
                            </svg>
                            Deletar
                        </button>
                    </div>
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
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Ativo ?
                            </label>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <h5 class="mb-0">Cadastrado em: <span class="badge text-bg-warning">{{ data_cadastro }}</span>
                            </h5>
                            <h5 class="mb-0">Editado em: <span class="badge text-bg-warning">{{ data_atualizado }}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.edicao-modelo {
    padding: 30px;
}
</style>