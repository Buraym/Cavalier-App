<template>
  <nav class="navbar sticky-top bg-body-tertiary">
    <div class="container-fluid d-flex justify-content-start align-items-center" style="padding-left: 38px;">
      <router-link to="/config" class="display: flex">
        <i class="bi bi-gear-fill"></i>
      </router-link>
      <router-link to="/" class="display: flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill"
          viewBox="0 0 16 16">
          <path
            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
        </svg>
      </router-link>
      <router-link to="/condutor">
        Condutores
      </router-link>
      <router-link to="/veiculo">
        Veiculos
      </router-link>
      <router-link to="/marca">
        Marcas
      </router-link>
      <router-link to="/modelo">
        Modelos
      </router-link>
      <router-link to="/movimentacao">
        Movimentações
      </router-link>
      <router-link to="/relatorio">
        Relatório
      </router-link>
    </div>
  </nav>

  <router-view />
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

nav {
  padding-top: 30px;
  padding-left: 35px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    margin: 0px 10px;

    &.router-link-exact-active {
      color: #ffc107;
    }
  }
}
</style>
