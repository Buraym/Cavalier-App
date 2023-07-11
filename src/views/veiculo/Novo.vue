<script lang="ts">
import { defineComponent, ref } from 'vue';
import { listar_modelos, criar_veiculo } from '@/utils/database';
const modelos = ref<any[] | []>([]);
export default defineComponent({
    name: 'CadastroVeiculo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            placa: "",
            ano: 2023,
            modelo: null,
            modelos,
            cor: null,
            tipo: null
        }
    },
    mounted() {
        this.RetornarModelos();
    },
    methods: {
        async RetornarModelos() {
            this.modelos = (await listar_modelos()).map((item) => ({ title: item.nome, value: item.id }));
        },
        async EnviarFormulario(event: any) {
            event.preventDefault();
            await criar_veiculo({
                ano: Number(this.ano),
                cor: this.cor,
                placa: this.placa,
                tipo: this.tipo,
                modelo_id: this.modelo,
            });
            this.$router.push('/veiculo')
        }
    }
});
</script>
<template>
    <div class="cadastro-veiculo">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>Cadastro de Veiculo</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Placa do veiculo</span>
                        <input type="text" v-model="placa" class="form-control" min="8" max="10"
                            placeholder="Placa do veiculo" aria-label="Placa do veiculo" aria-describedby="basic-addon1"
                            required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Ano da versão</span>
                        <input type="number" v-model="ano" class="form-control" placeholder="Ano da versão"
                            :max="new Date().getFullYear()" :min="1900" aria-label="Ano da versão"
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Modelo</label>
                        <select v-model="modelo" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">Escolha um modelo</option>
                            <option v-for="(item) in modelos" :key="item.value" :value="item.value">
                                {{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Cor</label>
                        <select v-model="cor" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">Escolha uma cor</option>
                            <option value="RED">Vermelho</option>
                            <option value="WHITE">Branco</option>
                            <option value="GREY">Cinza</option>
                            <option value="SILVER">Prata</option>
                            <option value="BLACK">Preto</option>
                            <option value="PURPLE">Roxo</option>
                            <option value="ORANGE">Laranja</option>
                            <option value="GREEN">Verde</option>
                            <option value="BLUE">Azul</option>
                            <option value="OTHER">Outra cor ou estampa</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Tipo de Veiculo</label>
                        <select v-model="tipo" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">Escolha uma tipo</option>
                            <option value="CARRO">Carro</option>
                            <option value="MOTO">Moto</option>
                            <option value="VAN">Van</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">Cadastrar veiculo</button>
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