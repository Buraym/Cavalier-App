<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { editar_configuracao, retornar_configuracao } from '@/controllers/configuracao';
import { open, message } from '@tauri-apps/api/dialog';
import { downloadDir } from '@tauri-apps/api/path';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";
import { set_backup_folder, upload_backup_data } from '@/utils/database';

const toast = useToast();
export default defineComponent({
    name: 'Configuracoes',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            moeda: "brl",
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
            backup_since: "",
            backup_folder: "",
            backup_folder_warning: false,
            backup_folder_warning_text: "",
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
                this.moeda = configuracao.moeda;
                this.backup_since =
                    configuracao.backup_since ?
                        format(new Date(configuracao.backup_since), "dd/MM/yyyy HH:mm") :
                        String(getLocalisedMessage(String(this.$i18n.locale), "config", "index", "backup-since-never"))
                if (configuracao.backup_folder === null) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "config", "index", "undefined-backup-folder")),
                        { id: "undefined-backup-folder", timeout: false }
                    )
                } else {
                    this.backup_folder = configuracao.backup_folder;
                }
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
                    tempo_de_desconto: this.tempoDeDesconto,
                    moeda: this.moeda
                });
                this.$router.push("/");
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "update-config")),
                    { id: "update-config" }
                )
            }
        },
        async UpdateBackupFolderLocation() {
            try {
                const path = String(this.backup_folder) !== "" ? String(this.backup_folder) : await downloadDir();
                const selected = await open({
                    directory: true,
                    multiple: false,
                    title: String(getLocalisedMessage(String(this.$i18n.locale), "config", "index", "update-backup-dialog-title")),
                    defaultPath: path
                });
                if (selected !== null) {
                    await set_backup_folder(String(selected));
                    this.backup_folder_warning = false;
                    this.backup_folder = String(selected);
                }
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "update-backup-folder")),
                    { id: "update-backup-folder" }
                )
            }
        },
        async GetBackupData() {
            try {
                const path = String(this.backup_folder) !== "" ? String(this.backup_folder) : await downloadDir();
                const selected = await open({
                    directory: false,
                    multiple: false,
                    title: String(getLocalisedMessage(String(this.$i18n.locale), "config", "index", "update-backup-dialog-title")),
                    defaultPath: path
                });
                const result = await upload_backup_data(String(selected))
            } catch (err) {
            }

        }
    }
});
</script>
<template>
    <div class="px-5">
        <form @submit="EnviarFormulario" class="container">
            <h4 class="text-start mb-3  mt-5">{{ $t("config.index.main-title") }}</h4>
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
            <div class="d-flex w-100 justify-content-center align-items-center gap-3 mb-3">
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
                <div class="input-group m-0">
                    <label class="input-group-text" for="inputGroupSelect01">
                        {{ $t("config.index.currency-chosen") }}
                    </label>
                    <select v-model="moeda" class="form-select" required>
                        <option value="brl">{{ $t("config.index.currency-brl") }}</option>
                        <option value="ars">{{ $t("config.index.currency-ars") }}</option>
                        <option value="pyg">{{ $t("config.index.currency-pyg") }}</option>
                        <option value="usd">{{ $t("config.index.currency-usd") }}</option>
                    </select>
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
            <div class="d-flex w-100 justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex text-start justify-content-center align-items-center">
                    <p v-if="String(backup_folder) !== ''" class="mt-1" :title="$t('config.index.backup-since-info')">
                        {{ $t("config.index.saved-backup-folder-path") }}<br>{{ backup_folder }}
                    </p>
                </div>
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <p class="mt-3" :title="$t('config.index.backup-since-info')">
                        {{ $t("config.index.backup-since") }}
                        <span class="badge text-bg-warning">{{ backup_since }}</span>
                    </p>
                    <button type="button" :title="$t('config.index.backup-folder-path')"
                        v-bind:class="{ 'btn-danger': backup_folder_warning, 'btn-warning': !backup_folder_warning }"
                        class="btn" @click="async () => await UpdateBackupFolderLocation()">
                        <i class="bi bi-folder-fill"></i>
                    </button>
                    <button v-if="String(backup_folder) !== ''" type="button" :title="$t('config.index.backup-folder-path')"
                        class="btn btn-primary" @click="async () => await GetBackupData()">
                        <i class="bi bi-cloud-arrow-down-fill"></i>
                    </button>
                </div>
            </div>
            <button type="submit" class="btn btn-warning w-100">
                {{ $t("config.index.save-changes") }}
            </button>
        </form>
    </div>
</template>