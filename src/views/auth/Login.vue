<script lang="ts">
import { defineComponent } from 'vue';
import { useUsersStore } from '@/stores/index'
export default defineComponent({
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            remember: false,
            mode: "login",
            registerData: {
                name: "",
                document: "",
                email: "",
                password: "",
                confirmPassword: "",
                contact: ""
            }
        }
    },
    methods: {
        async Login(ev: any) {
            ev.preventDefault();
            const usersStore = useUsersStore()
            console.log(this.email, this.password);
            const result = await usersStore.login({ email: this.email, password: this.password, remember: this.remember });
            console.log(result);
            this.$router.push("/");
        },

        async Register(ev: any) {
            ev.preventDefault();
            const usersStore = useUsersStore()
            console.log(
                "Aqui vai cadastrar !!!",
                {
                    name: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password,
                    document: this.registerData.document,
                    contact: this.registerData.contact,
                    role: 'user'
                }
            );
            if (
                String(this.registerData.password) === String(this.registerData.confirmPassword) &&
                String(this.registerData.password).length >= 8
            ) {

            } else {

            }
            const result = await usersStore.registerUser(
                {
                    name: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password,
                    document: this.registerData.document,
                    contact: this.registerData.contact,
                    role: 'user'
                }
            );
            this.email = result.user.email;
            this.password = result.user.password;
            this.mode = "login"
            console.log(result);
        },
        async setMode(mode: "login" | "register") {
            this.mode = mode;
            console.log(mode);
        }
    }
})
</script>
<template>
    <div :class="mode === 'login' ? 'login-helper-box' : 'login-helper-box closed'">
        <div class="w-100" style="margin-bottom: 100px">
            <h2 class="mb-5 pacifico text-white text-start title">O melhor app de estacionamento gratuíto já feito !</h2>
            <p class="text-white text-start mooli subtitle">
                Com funções de automatização de contas, relatórios de custos e lucros, backup dos dados na nuvem,
                portabilidade para Windows, Linux, Mac OS, emissão de via do cliente e ticket, notificações pelo telefone do
                usuario e muito mais funcionalidades.
            </p>
        </div>
    </div>
    <div :class="mode === 'login' ? 'form-box' : 'form-box changed'">
        <div class="w-100" style="margin-bottom: 100px">
            <h2 class="mb-1 pacifico">Seja muito bem-vindo !</h2>
            <small class="mooli">entre com as suas credenciais</small>
        </div>
        <form @submit="(ev) => mode === 'login' ? Login(ev) : Register(ev)" class="w-100">
            <!-- LOGIN COMPONENTS -->
            <div class="w-100 mb-3" v-if="mode === 'login'">
                <label for="login-email-input" class="form-label w-100 text-start">Email</label>
                <input type="email" class="form-control" autocomplete="username" id="login-email-input" v-model="email"
                    placeholder="Email" required>
            </div>
            <div class="w-100 mb-3" v-if="mode === 'login'">
                <label for="login-password-input" class="form-label w-100 text-start">Senha</label>
                <input type="password" class="form-control" autocomplete="current-password" id="login-password-input"
                    v-model="password" placeholder="Senha" required>
            </div>
            <div class="form-check mb-5" v-if="mode === 'login'">
                <input class="form-check-input" type="checkbox" v-model="remember" id="login-remember-me">
                <label class="form-check-label w-100 text-start" for="login-remember-me">
                    Manter-me conectado ?
                </label>
            </div>
            <div class="w-100" v-if="mode === 'login'">
                <button type="submit" class="btn btn-warning w-100 text-white">Entrar</button>
                <div class="d-flex justify-content-between align-items-center mooli">
                    <hr style="width:calc(40% - 10px)">
                    ou
                    <hr style="width:calc(40% - 10px)">
                </div>
                <button type="button" @click="setMode('register')"
                    class="btn btn-primary w-100 text-white">Cadastrar-se</button>
            </div>
            <!-- REGISTER COMPONENTS -->
            <div class="w-100 mb-3" v-if="mode === 'register'">
                <label for="login-email-input" class="form-label w-100 text-start">Nome completo</label>
                <input type="text" class="form-control" id="register-name-input" v-model="registerData.name"
                    placeholder="Nome completo" required>
            </div>
            <div class="w-100 mb-3" v-if="mode === 'register'">
                <label for="login-email-input" class="form-label w-100 text-start">Email</label>
                <input type="email" class="form-control" autocomplete="username" id="login-email-input"
                    v-model="registerData.email" placeholder="Email" required>
            </div>
            <div class="w-100 mb-3" v-if="mode === 'register'">
                <label for="login-password-input" class="form-label w-100 text-start">Senha</label>
                <input type="password" minlength="8" autocomplete="current-password" class="form-control"
                    id="login-password-input" v-model="registerData.password" placeholder="Senha" required>
            </div>
            <div class="w-100 mb-3" v-if="mode === 'register'">
                <label for="login-password-input" class="form-label w-100 text-start">Confirme sua senha</label>
                <input type="password" minlength="8" class="form-control" id="login-password-input"
                    v-model="registerData.confirmPassword" placeholder="Confirme sua senha" required>
            </div>
            <div class="w-100 mb-3" v-if="mode === 'register'">
                <label for="login-password-input" class="form-label w-100 text-start">Contato</label>
                <input type="text" class="form-control" id="login-password-input" v-model="registerData.contact"
                    placeholder="Contato" required>
            </div>
            <div class="w-100" v-if="mode === 'register'">
                <button type="submit" class="btn btn-warning w-100 text-white">Cadastrar-se</button>
                <div class="d-flex justify-content-between align-items-center mooli">
                    <hr style="width:calc(40% - 10px)">
                    ou
                    <hr style="width:calc(40% - 10px)">
                </div>
                <button type="button" @click="setMode('login')" class="btn btn-primary w-100 text-white">Entrar</button>
            </div>
        </form>
    </div>
    <div :class="mode === 'login' ? 'register-box' : 'register-box opened'">
        <div class="w-100" style="margin-bottom: 100px">
            <h2 class="mb-5 pacifico text-white text-start title">Cadastre-se hoje mesmo !</h2>
            <p class="text-white text-start mooli subtitle">
                Bem-vindo ao nosso aplicativo! Para começar a aproveitar todos os recursos e benefícios, por favor, complete
                o processo de cadastro ao lado.
            </p>
        </div>
    </div>
</template>
<style lang="scss">
@media (min-width: 200px) and (max-width:1016px) {
    .login-helper-box {
        display: none !important;
    }

    .form-box {
        width: calc(100% - 20px) !important;
    }
}

@import url('https://fonts.googleapis.com/css2?family=Mooli&family=Pacifico&display=swap');

.title {
    font-size: 30px;
}

.subtitle {
    font-size: 20px;
}

.pacifico {
    font-family: 'Pacifico';
}

.mooli {
    font-family: 'Mooli';
}

.text-white {
    color: white;
}

.form-box {
    display: flex;
    height: calc(100% - 20px);
    align-items: center;
    justify-content: center;
    margin: 10px;
    background: #FFF;
    flex-direction: column;
    border-radius: 20px;
    padding: 100px;
    flex: 0 0 auto;
    width: calc(41.66666667% - 20px);
    transition: 250ms ease-in-out;
}

.form-box.changed {
    width: calc(41.66666667% - 20px);
}

.login-helper-box {
    display: flex;
    height: calc(100% - 20px);
    align-items: center;
    justify-content: center;
    margin: 10px;
    background: transparent;
    flex-direction: column;
    border-radius: 20px;
    padding: 100px;
    flex: 0 0 auto;
    width: calc(58.33333333% - 20px);
    transition: 250ms ease-in-out;
}

.login-helper-box * {
    display: block;
    opacity: 1;
    transition: 250ms ease-in-out;
}

.login-helper-box.closed {
    margin: 0px;
    padding: 0px;
    width: 0px;
}

.login-helper-box.closed * {
    display: none;
    opacity: 0;
    transition: 250ms ease-in-out;
}

.register-box {
    display: none;
    height: calc(100% - 20px);
    align-items: center;
    justify-content: center;
    margin: 10px;
    background: transparent;
    flex-direction: column;
    border-radius: 20px;
    padding: 100px;
    flex: 0 0 auto;
    width: 0px;
    transition: 250ms ease-in-out;
}

.register-box * {
    display: none;
    opacity: 0;
    transition: 250ms ease-in-out;
}

.register-box.opened {
    display: flex;
    width: calc(58.33333333% - 20px);
}

.register-box.opened * {
    display: block;
    opacity: 1;
    transition: 250ms ease-in-out;
}
</style>