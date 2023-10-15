<script lang="ts">
import { defineComponent, ref } from 'vue';
import { format } from "date-fns"
import { editar_veiculo, retornar_veiculo, deletar_veiculo } from '@/controllers/veiculo';
import { listar_modelos } from '@/controllers/modelo';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
const modelos = ref<any[] | []>([]);

const toast = useToast();

export default defineComponent({
    name: 'EdicaoVeiculo',
    data: () => {
        return {
            ativo: true,
            placa: "",
            ano: 2023,
            modelo: null,
            modelos,
            cor: null,
            tipo: null,
            data_cadastro: "",
            data_atualizado: "",
        }
    },
    mounted() {
        this.RetornarModelos();
        this.RetornarVeiculo();
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
        async RetornarVeiculo() {
            try {
                const veiculo = await retornar_veiculo(String(this.$route.params.veiculo_id));
                this.placa = veiculo.placa;
                this.ano = veiculo.ano;
                this.modelo = veiculo.modelo.id;
                this.cor = veiculo.cor;
                this.tipo = veiculo.tipo;
                this.ativo = veiculo.ativo ? true : false;
                this.data_cadastro = format(new Date(veiculo.cadastro), "dd/MM/yyyy HH:mm")
                if (veiculo.atualizacao) {
                    this.data_atualizado = format(new Date(veiculo.atualizacao), "dd/MM/yyyy HH:mm")
                }
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-vehicle")),
                    { id: "return-vehicle" }
                )
            }
        },
        async EditarVeiculo(event: any) {
            try {
                event.preventDefault();
                await editar_veiculo(String(this.$route.params.veiculo_id), {
                    ativo: this.ativo,
                    placa: this.placa,
                    ano: this.ano,
                    modelo: this.modelo,
                    cor: this.cor,
                    tipo: this.tipo,
                });
                this.$router.push("/veiculo");
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
        },
        async DeletarItem() {
            try {
                await deletar_veiculo(String(this.$route.params.veiculo_id));
                this.$router.push("/veiculo");
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "remove-vehicle")),
                    { id: "remove-vehicle" }
                )
            }
        }
    }
});
</script>
<template>
    <div class="edicao-veiculo">
        <div class="container text-start">
            <form @submit="EditarVeiculo">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <div class=" d-flex justify-content-center align-items-center gap-2">
                        <button type="submit" class="btn btn-warning">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                class='bi bi-pencil-fill' viewBox='0 0 16 16'>
                                <path
                                    d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                            </svg>
                            {{ $t("vehicles.edit.update-registry") }}
                        </button>
                        <button type="button" class="btn btn-danger" @click="DeletarItem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                                </path>
                            </svg>
                            {{ $t("vehicles.edit.delete-registry") }}
                        </button>
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("vehicles.edit.vehicle-plate") }}</span>
                        <input type="text" v-model="placa" class="form-control"
                            :placeholder='$t("vehicles.edit.vehicle-plate")' :aria-label='$t("vehicles.edit.vehicle-plate")'
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("vehicles.edit.vehicle-year") }}</span>
                        <input type="number" min="1900" :max="new Date().getFullYear()" v-model="ano" class="form-control"
                            :placeholder='$t("vehicles.edit.vehicle-year")' :aria-label='$t("vehicles.edit.vehicle-year")'
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("vehicles.edit.model-name") }}
                        </label>
                        <select v-model="modelo" class="form-select" id="inputGroupSelect01">
                            <option value="null">{{ $t("vehicles.edit.choose-model-name") }}</option>
                            <option v-for="(item) in modelos" :key="item.id" :value="item.value"
                                :selected="item.value === modelo">{{ item.title }}</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("vehicles.edit.vehicle-color") }}
                        </label>
                        <select v-model="cor" class="form-select" id="inputGroupSelect01">
                            <option value="null">{{ $t("vehicles.edit.choose-vehicle-color") }}</option>
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
                            {{ $t("vehicles.edit.vehicle-type") }}
                        </label>
                        <select v-model="tipo" class="form-select" id="inputGroupSelect01">
                            <option value="null">{{ $t("vehicles.add.choose-vehicle-type") }}</option>
                            <option value="CARRO">{{ $t("general.index.vehicle-car") }}</option>
                            <option value="MOTO">{{ $t("general.index.vehicle-motorcycle") }}</option>
                            <option value="VAN">{{ $t("general.index.vehicle-van") }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <div class="form-check">
                            <input v-model="ativo" class="form-check-input" type="checkbox" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ $t("vehicles.edit.vehicle-active") }}
                            </label>
                        </div>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <h5 v-if="data_cadastro !== ''" class="mb-0">
                                {{ $t("vehicles.edit.vehicle-created-at") }}
                                <span class="badge text-bg-warning">{{ data_cadastro }}</span>
                            </h5>
                            <h5 v-if="data_atualizado !== ''" class="mb-0">
                                {{ $t("vehicles.edit.vehicle-updated-at") }}
                                <span class="badge text-bg-warning">{{ data_atualizado }}</span>
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