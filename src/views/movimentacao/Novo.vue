<script lang="ts">
import { defineComponent, ref } from 'vue';
import { criar_movimentacao } from '@/controllers/movimentacao';
import { listar_veiculos } from '@/controllers/veiculo';
import { listar_condutores } from '@/controllers/condutor';
import { retornar_configuracao } from '@/controllers/configuracao';
import { format } from 'date-fns';
import { CalcTotalTime } from '@/utils';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";

const condutores = ref<any[] | []>([]);
const veiculos = ref<any[] | []>([]);
const toast = useToast();
export default defineComponent({
    name: 'CadastroModelo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            condutor: null,
            condutores,
            veiculo: null,
            veiculos,
            config: null,
            entrada: format(new Date(), "yyyy-MM-dd HH:mm"),
            saida: "",
            tempo: "00:00",
            tempoDesconto: "00:00",
            tempoMulta: "00:00",
            valorDesconto: 0.00,
            valorMulta: 0.00,
            valorTotal: 0.00,
            valorHora: 0.00,
            valorHoraMulta: 0.00,
            calculoAutomatico: true
        }
    },
    mounted() {
        this.RetornarCondutores();
        this.RetornarVeiculos();
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            try {
                const config = await retornar_configuracao();
                this.config = config;
                this.valorHora = config.valor_hora;
                this.valorHoraMulta = config.valor_hora;
                this.valorHora = config.valor_hora;
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-config-movimentations")),
                    { id: "return-config-movimentations" }
                )
            }
        },
        async RetornarCondutores() {
            try {
                this.condutores = (await listar_condutores()).map((item) => ({ title: item.nome, value: item.id }));
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-drivers")),
                    { id: "return-drivers" }
                )
            }
        },
        async RetornarVeiculos() {
            try {
                this.veiculos = (await listar_veiculos()).map((item) => ({ title: item.modelo.nome + " - " + item.placa, value: item.id }));
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-vehicles")),
                    { id: "return-vehicles" }
                )
            }
        },
        async EnviarFormulario(event: any) {
            try {
                event.preventDefault();
                let customValues = {
                    tempo: this.tempo,
                    tempo_desconto: this.tempoDesconto,
                    tempo_multa: this.tempoMulta,
                    valor_desconto: this.valorDesconto,
                    valor_multa: this.valorMulta,
                    valor_total: this.valorTotal,
                    valor_hora: this.valorHora,
                    valor_hora_multa: this.valorHoraMulta,
                    valor_minuto_hora: Number(this.valorHora / 60)
                }
                let data: any = {
                    condutor_id: this.condutor,
                    veiculo_id: this.veiculo,
                    entrada: new Date(this.entrada),
                    saida: null,
                    tempo: 0,
                    tempo_desconto: 0,
                    tempo_multa: 0,
                    valor_desconto: 0,
                    valor_multa: 0,
                    valor_total: 0,
                    valor_hora: 0,
                    valor_hora_multa: 0,
                }
                if (this.saida !== "") {
                    if (new Date(this.saida).valueOf() <= new Date(this.entrada).valueOf()) {
                        throw new Error("INVALID entry");
                    }
                    console.log(new Date(this.entrada), new Date(this.saida));
                    let calculatedData = CalcTotalTime({
                        entrada: new Date(this.entrada),
                        saida: new Date(this.saida),
                    }, this.calculoAutomatico ? this.config : null, this.calculoAutomatico ? null : customValues);
                    data = {
                        condutor_id: this.condutor,
                        veiculo_id: this.veiculo,
                        entrada: new Date(this.entrada),
                        saida: new Date(this.saida),
                        tempo: calculatedData.tempo,
                        tempo_desconto: calculatedData.tempo_desconto,
                        tempo_multa: calculatedData.tempo_multa,
                        valor_desconto: calculatedData.valor_desconto,
                        valor_multa: calculatedData.valor_multa,
                        valor_total: calculatedData.valor_total,
                        valor_hora: calculatedData.valor_hora,
                        valor_hora_multa: calculatedData.valor_hora_multa,
                    }
                }
                await criar_movimentacao(data);
                this.$router.push('/movimentacao');
            } catch (err) {
                if (String(err as String).includes("NOT NULL constraint failed: movimentacao.condutor_id (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-driver-create-vehicle")),
                        { id: "not-null-driver-create-vehicle" }
                    )
                } else if (String(err as String).includes("NOT NULL constraint failed: movimentacao.veiculo_id (code 19) ")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-vehicle-create-vehicle")),
                        { id: "not-null-vehicle-create-vehicle" }
                    )
                } else if (String(err as String).includes("INVALID entry")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "invalid-entry-create-vehicle")),
                        { id: "invalid-entry-create-vehicle" }
                    )
                } else {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "create-movimentation")),
                        { id: "create-movimentation" }
                    )
                }

            }
        }
    }
});
</script>
<template>
    <div class="cadastro-movimentacao">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-start gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <h2 class="mb-0">{{ $t("movimentation.add.movimentation-registration") }}</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("movimentation.add.driver-name") }}
                        </label>
                        <select v-model="condutor" class="form-select" id="inputGroupSelect01">
                            <option value="null">
                                {{ $t("movimentation.add.choose-driver-name") }}
                            </option>
                            <option v-for="(item) in condutores" :key="item.value" :value="item.value">{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">
                            {{ $t("movimentation.add.vehicle-name") }}
                        </label>
                        <select v-model="veiculo" class="form-select" id="inputGroupSelect01">
                            <option value="null">
                                {{ $t("movimentation.add.choose-vehicle-name") }}
                            </option>
                            <option v-for="(item) in veiculos" :key="item.value" :value="item.value">{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">{{ $t("movimentation.add.enter-time") }}</span>
                            <input type="datetime-local" v-model="entrada" class="form-control"
                                :placeholder='$t("movimentation.add.enter-time")'
                                :aria-label='$t("movimentation.add.enter-time")' aria-describedby="basic-addon1" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.exit-time") }}
                            </span>
                            <input type="datetime-local" v-model="saida" class="form-control"
                                :placeholder='$t("movimentation.add.exit-time")'
                                :aria-label='$t("movimentation.add.exit-time")' aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.total-duration") }}
                            </span>
                            <input type="time" v-model="tempo" class="form-control"
                                :placeholder='$t("movimentation.add.total-duration")'
                                :aria-label='$t("movimentation.add.total-duration")' aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.discount-time") }}
                            </span>
                            <input type="time" v-model="tempoDesconto" class="form-control"
                                :placeholder='$t("movimentation.add.discount-time")'
                                :aria-label='$t("movimentation.add.discount-time")' aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.fee-time") }}
                            </span>
                            <input type="time" v-model="tempoMulta" class="form-control"
                                :placeholder='$t("movimentation.add.fee-time")'
                                :aria-label='$t("movimentation.add.fee-time")' aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div v-if="!calculoAutomatico" class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.discount-value") }}
                            </span>
                            <input type="text" v-model="valorDesconto" class="form-control"
                                :placeholder='$t("movimentation.add.discount-value")'
                                :aria-label='$t("movimentation.add.discount-value")' aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.fee-value") }}
                            </span>
                            <input type="text" v-model="valorMulta" class="form-control"
                                :placeholder='$t("movimentation.add.fee-value")'
                                :aria-label='$t("movimentation.add.fee-value")' aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.fee-hour-value") }}
                            </span>
                            <input type="text" v-model="valorHoraMulta" class="form-control"
                                :placeholder='$t("movimentation.add.fee-hour-value")'
                                :aria-label='$t("movimentation.add.fee-hour-value")' aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div v-if="!calculoAutomatico" class="d-flex align-items-center justify-content-center gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.unit-hour-value") }}
                            </span>
                            <input type="text" v-model="valorHora" class="form-control"
                                :placeholder='$t("movimentation.add.unit-hour-value")'
                                :aria-label='$t("movimentation.add.unit-hour-value")' aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                {{ $t("movimentation.add.total-value") }}
                            </span>
                            <input type="text" v-model="valorTotal" class="form-control"
                                :placeholder='$t("movimentation.add.unit-hour-value")'
                                :aria-label='$t("movimentation.add.unit-hour-value")' aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap-2 mb-3">
                        <div class="form-check">
                            <input v-model="calculoAutomatico" class="form-check-input" type="checkbox"
                                id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ $t("movimentation.add.automatic-calculation") }}
                            </label>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">
                            {{ $t("movimentation.add.register-movimentation") }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cadastro-movimentacao {
    padding: 30px;
}

@media (max-width: 992px) {
    .cadastro-movimentacao {
        padding: 10px;
    }
}
</style>