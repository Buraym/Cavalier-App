<script lang="ts">
import { listar_marcas } from '@/controllers/marca';
import { criar_modelo } from '@/controllers/modelo';
import { defineComponent, ref } from 'vue';
import { useToast } from "vue-toastification";
import { getLocalisedMessage } from '@/utils';

const toast = useToast()

const marcas = ref<any[] | []>([]);
export default defineComponent({
    name: 'CadastroModelo',
    emits: ['EnviarFormulario'],
    data: () => {
        return {
            nome: "",
            marca: null,
            marcas,
        }
    },
    mounted() {
        this.RetornarMarcas();
    },
    methods: {
        async RetornarMarcas() {
            try {
                this.marcas = (await listar_marcas()).map((item) => ({ title: item.nome, value: item.id }));
            } catch (err) {
                toast.error(
                    String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "return-brands")),
                    { id: "return-brands" }
                )
            }
        },
        async EnviarFormulario(event: any) {
            try {
                event.preventDefault();
                await criar_modelo({
                    nome: this.nome,
                    marca_id: this.marca
                });
                this.$router.push('/modelo')
            } catch (err) {
                if ((err as String).includes("NOT NULL constraint failed: modelo.marca_id (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-null-brand-create-model")),
                        { id: "not-null-brand-create-model" }
                    )
                } else if ((err as String).includes("UNIQUE constraint failed: modelo.nome (code 19)")) {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "not-unique-name-create-model")),
                        { id: "not-unique-name-create-model" }
                    )
                } else {
                    toast.error(
                        String(getLocalisedMessage(String(this.$i18n.locale), "error", "index", "create-model")),
                        { id: "create-model" }
                    )
                }
            }
        }
    }
});
</script>
<template>
    <div class="cadastro-modelo">
        <div class="container text-start">
            <form @submit="EnviarFormulario">
                <div class="d-flex align-items-center justify-content-start gap-2 mt-5 mb-3">
                    <a class="back d-flex justify-content-center align-items-center" @click="$router.go(-1)">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <h2 class="mb-0">{{ $t("models.add.model-registration") }}</h2>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">{{ $t("models.add.model-name") }}</span>
                        <input type="text" v-model="nome" class="form-control" :placeholder='$t("models.add.model-name")'
                            :aria-label='$t("models.add.model-name")' aria-describedby="basic-addon1" required>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">{{ $t("models.add.brand-name") }}</label>
                        <select v-model="marca" class="form-select" id="inputGroupSelect01" required>
                            <option value="null">{{ $t("models.add.choose-brand-name") }}</option>
                            <option v-for="(item) in marcas" :key="item.id" :value="item.value" selected>{{ item.title }}
                            </option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                        <button type="submit" class="btn btn-warning w-100">{{ $t("models.add.register-model") }}</button>
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