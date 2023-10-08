<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { editar_configuracao, retornar_configuracao } from '@/controllers/configuracao';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";

const toast = useToast();

export default defineComponent({
    name: 'Configuracoes',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            vagasCarro: "10",
            vagasMoto: "5",
            vagasVan: "2",
            valorHora: 12.2,
            valorMinutoHora: 1.5,
            inicioExpediente: "09:00:00",
            fimExpediente: "18:00:00",
            gerarDesconto: true,
            tempoParaDesconto: "00:30:00",
            tempoDeDesconto: "01:00:00",
            ativo: true,
        }
    },
    mounted() {
        this.RetornarConfiguracao();
    },
    methods: {
        async RetornarConfiguracao() {
            try {
                const configuracao = await retornar_configuracao();
                this.vagasCarro = String(configuracao.vagas_carro);
                this.vagasMoto = String(configuracao.vagas_moto);
                this.vagasVan = String(configuracao.vagas_van);
                this.valorHora = configuracao.valor_hora;
                this.valorMinutoHora = configuracao.valor_minuto_hora;
                this.inicioExpediente = configuracao.inicio_expediente;
                this.fimExpediente = configuracao.fim_expediente;
                this.gerarDesconto = configuracao.gerar_desconto ? true : false;
                this.tempoParaDesconto = configuracao.tempo_para_desconto;
                this.tempoDeDesconto = configuracao.tempo_de_desconto;
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-config")),
                    { id: "return-config" }
                )
            }

        },
        async EnviarFormulario(event: any) {
            try {
                event.preventDefault();
                await editar_configuracao({
                    vagas_carro: this.vagasCarro,
                    vagas_moto: this.vagasMoto,
                    vagas_van: this.vagasVan,
                    valor_hora: this.valorHora,
                    valor_minuto_hora: this.valorMinutoHora,
                    inicio_expediente: this.inicioExpediente,
                    fim_expediente: this.fimExpediente,
                    gerar_desconto: this.gerarDesconto,
                    tempo_para_desconto: this.tempoParaDesconto,
                    tempo_de_desconto: this.tempoDeDesconto
                });
                this.$router.push("/");
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "update-config")),
                    { id: "update-config" }
                )
            }

        }
    }
});
</script>
<template>
    <div class="px-5">
        <form @submit="EnviarFormulario" class="container">
            <h4 class="text-start mb-3  mt-5">{{ $t("config.index.main-title") }}s</h4>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="input-group m-0">
                    <span class="input-group-text">{{ $t("config.index.car-vacancies-qty") }}</span>
                    <input type="number" v-model="vagasCarro" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">{{ $t("config.index.motorcycle-vacancies-qty") }}</span>
                    <input type="number" v-model="vagasMoto" class="form-control">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">{{ $t("config.index.van-vacancies-qty") }}</span>
                    <input type="number" v-model="vagasVan" class="form-control">
                </div>
            </div>
            <div class="d-flex w-100 align-items-center justify-content-center gap-3 mb-3">
                <div class="input-group m-0">
                    <span class="input-group-text">{{ $t("config.index.hourly-time") }}</span>
                    <input type="number" v-model="valorHora" step="0.01" class="form-control"
                        :placeholder='$t("config.index.hourly-time")' :aria-label='$t("config.index.hourly-time")'>
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">{{ $t("config.index.minute-time") }}</span>
                    <input type="number" v-model="valorMinutoHora" step="0.01" class="form-control"
                        :placeholder='$t("config.index.minute-time")' :aria-label='$t("config.index.minute-time")'>
                </div>
                <!-- <div class="input-group m-0">
                    <span class="input-group-text">Inicio do expediente</span>
                    <input type="time" v-model="inicioExpediente" step="1" class="form-control"
                        aria-label="Inicio do expediente">
                </div>
                <div class="input-group m-0">
                    <span class="input-group-text">Fim do expediente</span>
                    <input type="time" v-model="fimExpediente" step="1" class="form-control" placeholder="Fim do expediente"
                        aria-label="Fim do expediente">
                </div> -->
            </div>
            <button type="submit" class="btn btn-warning w-100">{{ $t("config.index.save-changes") }}</button>
        </form>
    </div>
</template>