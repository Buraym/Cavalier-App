import { auth_user } from "@/controllers/users";
import { defineStore } from "pinia"

export interface IAuth {
  email: string;
  password: string
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
  role: 'admin' | 'user'
}

export const useUsersStore = defineStore('users', {
    state: () => {
        return { user: null as IUser | null }
    },
    actions: {
      async login(pass: IAuth) {
        const hasUser =  await auth_user(pass.email, pass.password);
        if (hasUser) {
          this.user = hasUser;
        }
      },
    },
  })