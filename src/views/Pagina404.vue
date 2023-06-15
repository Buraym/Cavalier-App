<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PaginaNaoEncontrada',
});
</script>
<template>
    <div class="d-flex pagina-nao-encontrada justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-center align-items-center gap-2">
            <h4>
                Página <strong>"{{ $route.params.nomepagina[0] }}"</strong> não foi encontrada !!!
            </h4>
            <a href="/" class="btn btn-outline-warning">Voltar á página inicial ?</a>
        </div>
    </div>
</template>
<style scoped>
.pagina-nao-encontrada {
    width: 100vw;
    height: 85vh
}
</style>