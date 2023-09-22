<script lang="ts">
import { defineComponent } from 'vue';
import { useUsersStore } from '@/stores/index'
export default defineComponent({
  name: "App",
  data() {
    return {
      usersStore: useUsersStore()
    }
  }
})
</script>
<template>
  <div :class="Boolean(usersStore.$state.user) ? 'container-fluid' : 'container-fluid d-none'">
    <div class="row">
      <div class="col-sm-auto bg-light sticky-top p-3">
        <div
          class="d-flex flex-sm-column flex-row flex-nowrap bg-light justify-content-end align-items-center sticky-top h-100">
          <!-- MAIN APP PAGE LINK -->
          <router-link to="/" class="mb-4 router-link">
            <img src="./assets/logo.png" alt="Logo">
          </router-link>
          <!-- TOPICS PAGES LINKS -->
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center gap-2">
            <li>
              <router-link to="/condutor" class="router-link" title="Condutor" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Condutor">
                <i class="bi bi-file-person"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/veiculo" class="router-link" title="Veiculo" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Veiculo">
                <i class="bi bi-car-front-fill"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/marca" class="router-link" title="Marca" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Marca">
                <i class="bi bi-building-fill"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/modelo" class="router-link" title="Modelo" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Modelo">
                <i class="bi bi-upc"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/movimentacao" class="router-link" title="Movimentacao" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Movimentacao">
                <i class="bi bi-arrow-left-right"></i>
              </router-link>
            </li>
            <li :class="String(usersStore.$state.user?.role) !== 'admin' ? 'd-none' : ''">
              <router-link to="/relatorio" class="router-link" title="Relatórios" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Relatórios">
                <i class="bi bi-clipboard-data-fill"></i>
              </router-link>
            </li>
            <li :class="String(usersStore.$state.user?.role) !== 'admin' ? 'd-none' : ''">
              <router-link to="/users" class="router-link" title="Usuarios" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Usuarios">
                <i class="bi bi-people-fill"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/config" class="router-link" title="Configurações" data-bs-toggle="tooltip"
                data-bs-placement="right" data-bs-original-title="Configurações">
                <i class="bi bi-gear-fill"></i>
              </router-link>
            </li>
          </ul>
          <button @click="usersStore.logout" style="border: none; background: none; border-radius: 10px" title="Sair">
            <i class="bi bi-door-open"></i>
          </button>
          <router-link to="/login" v-if="Boolean(usersStore.$state.user) === false" class="router-link" title="Entrar"
            data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Login">
            <i class="bi bi-door-open"></i>
          </router-link>
        </div>
      </div>
      <div class="col-sm p-3 min-vh-100">
        <router-view />
      </div>
    </div>
  </div>
  <div
    :class="Boolean(usersStore.$state.user) ? 'container-fluid h-100 login-page d-none' : 'container-fluid h-100 login-page'">
    <div class="row login-page" style="height: 100vh">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
@import "@/../node_modules/bootstrap/scss/bootstrap";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-check-input:checked {
  background-color: #ffc107 !important;
  border-color: #ffc107 !important;
}

.router-link {
  color: #2c3e50;
  transition: 350ms ease-in-out;
}

.router-link:hover {
  color: #ebbf3c;
}

.router-link-exact-active {
  color: #ffc107;
}

.back {
  background: transparent;
  color: #ffc107;
  border-radius: 20px;
  height: 30px;
  width: 30px;
  transition: 350ms ease-in-out;
  cursor: pointer;
}

.back:hover {
  background: #ffc107;
  color: #FFF;
}

.back:focus {
  background: #ebbf3c;
  color: #FFF;
}

.login-page {
  background: #ebbf3c;
}
</style>
