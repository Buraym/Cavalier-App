<script lang="ts">
import { defineComponent, ref } from 'vue';
import { criar_veiculo } from '@/controllers/veiculo';
import { listar_modelos } from '@/controllers/modelo';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
const modelos = ref<any[] | []>([]);
const toast = useToast();
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
            try {
                this.modelos = (await listar_modelos()).map((item) => ({ title: item.nome, value: item.id }));
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-models")),
                    { id: "return-models" }
                )
            }
        },
        async EnviarFormulario(event: any) {
            try {
                event.preventDefault();
                await criar_veiculo({
                    ano: Number(this.ano),
                    cor: this.cor,
                    placa: this.placa,
                    tipo: this.tipo,
                    modelo_id: this.modelo,
                });
                this.$router.push('/veiculo')
            } catch (err) {
                if ((err as String).includes("NOT NULL constraint failed: veiculo.cor (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-color-create-vehicle")),
                        { id: "not-null-color-create-vehicle" }
                    )
                } else if ((err as String).includes("NOT NULL constraint failed: veiculo.tipo (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-type-create-vehicle")),
                        { id: "not-null-type-create-vehicle" }
                    )
                } else if ((err as String).includes("NOT NULL constraint failed: veiculo.modelo_id (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-model-create-vehicle")),
                        { id: "not-null-model-create-vehicle" }
                    )
                } else if ((err as String).includes("UNIQUE constraint failed: veiculo.placa (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-unique-name-create-vehicle")),
                        { id: "not-unique-name-create-vehicle" }
                    )
                } else {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "create-vehicle")),
                        { id: "create-vehicle" }
                    )
                }
            }
        }
    }
});
</script>
<template>
    <div class="cadastro-veiculo">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>{{ $t("vehicles.add.vehicle-registration") }}</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("vehicles.add.vehicle-plate") }}</span>
                        <input type="text" v-model="placa" class="form-control" min="8" max="10"
                            :placeholder='$t("vehicles.add.vehicle-plate")' :aria-label='$t("vehicles.add.vehicle-plate")'
                            aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("vehicles.add.vehicle-year") }}</span>
                        <input type="number" v-model="ano" class="form-control"
                            :placeholder='$t("vehicles.add.vehicle-year")' :max="new Date().getFullYear()" :min="1900"
                            :aria-label='$t("vehicles.add.vehicle-year")' aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">{{ $t("vehicles.add.model-name") }}</label>
                        <select v-model="modelo" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">{{ $t("vehicles.add.choose-model-name") }}</option>
                            <option v-for="(item) in modelos" :key="item.value" :value="item.value">
                                {{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("vehicles.add.vehicle-color") }}
                        </label>
                        <select v-model="cor" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">{{ $t("vehicles.add.choose-vehicle-color") }}</option>
                            <option value="RED">{{ $t("general.index.color-red") }}</option>
                            <option value="WHITE">{{ $t("general.index.color-white") }}</option>
                            <option value="GREY">{{ $t("general.index.color-grey") }}</option>
                            <option value="SILVER">{{ $t("general.index.color-silver") }}</option>
                            <option value="BLACK">{{ $t("general.index.color-black") }}</option>
                            <option value="PURPLE">{{ $t("general.index.color-purple") }}</option>
                            <option value="ORANGE">{{ $t("general.index.color-orange") }}</option>
                            <option value="GREEN">{{ $t("general.index.color-green") }}</option>
                            <option value="BLUE">{{ $t("general.index.color-blue") }}</option>
                            <option value="OTHER">{{ $t("general.index.color-other") }}</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("vehicles.add.vehicle-type") }}
                        </label>
                        <select v-model="tipo" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">{{ $t("vehicles.add.choose-vehicle-type") }}</option>
                            <option value="CARRO">{{ $t("general.index.vehicle-car") }}</option>
                            <option value="MOTO">{{ $t("general.index.vehicle-motorcycle") }}</option>
                            <option value="VAN">{{ $t("general.index.vehicle-van") }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">
                            {{ $t("vehicles.add.register-vehicle") }}
                        </button>
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