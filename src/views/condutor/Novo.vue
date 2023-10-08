<script lang="ts">
import { IMaskComponent } from 'vue-imask';
import { criar_condutor } from "@/controllers/condutor";
import { defineComponent } from 'vue';
import { getLocalisedMessage } from '@/utils';
import { useToast } from "vue-toastification";

const toast = useToast();

export default defineComponent({
    name: 'CadastroCondutor',
    emits: ["EnviarFormulario"],
    data: () => {
        return {
            nome: "",
            cpf: "",
            telefone: ""
        }
    },
    components: {
        'imask-input': IMaskComponent
    },
    methods: {
        async EnviarFormulario(event: any) {
            try {
                event.preventDefault();
                await criar_condutor({
                    cpf: this.cpf,
                    nome: this.nome,
                    telefone: this.telefone
                })
                this.$router.push("/condutor");
            } catch (err) {
                console.log(err);
                if ((err as String).includes("UNIQUE constraint failed: condutor.cpf (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-unique-cpf-create-driver")),
                        { id: "not-unique-cpf-create-driver" }
                    )
                } else {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "create-driver")),
                        { id: "create-driver" }
                    )
                }
            }

        }
    }
});
</script>
<template>
    <div class="cadastro-condutor">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-between gap-2 mt-5 mb-3">
                    <h2>{{ $t("driver.add.driver-registration") }}</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("driver.add.driver-name") }}</span>
                        <input type="text" v-model="nome" class="form-control" :placeholder='$t("driver.add.driver-name")'
                            :aria-label='$t("driver.add.driver-name")' aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("driver.add.driver-cpf") }}</span>
                        <imask-input type="text" v-model="cpf" :mask="'000.000.000-00'" maxlength="14" class="form-control"
                            :placeholder='$t("driver.add.driver-cpf")' :aria-label='$t("driver.add.driver-cpf")'
                            aria-describedby="basic-addon1" required />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("driver.add.driver-telephone") }}</span>
                        <imask-input type="text" v-model="telefone" :mask="'+00 (00) 0 0000-0000'" class="form-control"
                            :min="17" :max="17" :placeholder='$t("driver.add.driver-telephone")'
                            :aria-label='$t("driver.add.driver-telephone")' aria-describedby="basic-addon1" required />
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">{{ $t("driver.add.register-driver") }}</button>
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