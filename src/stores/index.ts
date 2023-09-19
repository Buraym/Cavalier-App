import { auth_user, create_user, get_logged_user, list_users, logout_user, check_admin_created } from "@/controllers/users";
import router from "@/router";
import { defineStore } from "pinia"

export interface IAuthLogin {
  email: string
  password: string
  remember: boolean
}
export interface IAuthRegister {
  name: String,
  email: String,
  password: String,
  document: String,
  contact: String,
  role: 'admin' | 'user'
}
export interface IUser {
  id: Number,
  active: Boolean,
  updated_at: String,
  created_at: String,
  name: String,
  email: String,
  password: String,
  document: String,
  contact: String,
  role: 'admin' | 'user',
  logged: Boolean,
}

export const useUsersStore = defineStore('users', {
    state: () => {
        return { user: null as IUser | null }
    },
    actions: {
      async login(pass: IAuthLogin) {
        const users = await list_users();
        console.log(users);
        const hasUser =  await auth_user(pass.email, pass.password, pass.remember);
        console.log(hasUser);
        if (hasUser) {
          this.user = hasUser;
          return { user: hasUser, status: "sucess", message: "Usuário autenticado com sucesso !"};
        } else {
          return { user: null, status: "error", message: "Houve um erro ao autenticar o usuário !"};
        }
      },
      async getLoggedUser() {
        const loggedUser = await get_logged_user();
        if (loggedUser) {
          console.log("ACHOU UM USUARIO LOGADO")
          this.user = loggedUser;
          router.push("/");
        }
      },
      async logout() {
          await logout_user();
          this.user = null;
          router.push("/login");
      },
      async registerUser(user: IAuthRegister) {
        try {
          const adminCreated = await check_admin_created();
          if (adminCreated === false) {
            user.role = "admin";
          }
          const result = await create_user({...user});
          return { user: result, status: "sucess", message: "Usuário criado com sucesso !"};
        } catch (err) {
          console.log(err);
          return { user: null, status: "error", message: "Houve um erro ao criar o usuário !"};
        }
    },
    },
})