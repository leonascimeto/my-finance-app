// src/stores/auth.ts
import { defineStore } from "pinia";
import api from "../services/api";
import router from "../router";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any; // Defina uma interface para o usuário conforme necessário
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: false,
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post("/login", { email, password });
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem("token", this.token!);
        this.user = response.data.user;
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
      }
    },
    async signup(name: string, email: string, password: string) {
      try {
        const response = await api.post("/auth/signup", {
          name,
          email,
          password,
        });
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem("token", this.token!);
        // Opcional: salvar informações do usuário
        this.user = response.data.user;
        router.push("/dashboard");
      } catch (error: any) {
        throw error;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      router.push("/login");
    },
    // Opcional: Método para carregar o usuário ao inicializar
    async loadUser() {
      if (this.token) {
        try {
          const response = await api.get("/auth/me");
          this.user = response.data;
        } catch (error) {
          this.logout();
        }
      }
    },
  },
});
