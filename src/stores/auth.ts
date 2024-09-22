import { defineStore } from "pinia";
import api from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
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
        this.token = response.data.data.token;
        this.isAuthenticated = true;
        localStorage.setItem("token", this.token!);
        this.user = response.data.data.user;
        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
    async signup(name: string, email: string, password: string) {
      try {
        const response = await api.post("/signup", {
          name,
          email,
          password,
        });
        this.token = response.data.token;
        this.isAuthenticated = true;
        localStorage.setItem("token", this.token!);
        this.user = response.data.user;
        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
    async loadUser() {
      if (this.token) {
        try {
          const response = await api.get("/me");
          this.user = response.data.user;
          this.isAuthenticated = true;
          console.log("user", this.user);
          console.log("isAuthenticated", this.isAuthenticated);
          console.log("token", this.token);
          console.log("localStorage", localStorage.getItem("token"));
          console.log("response", response.data.user);
        } catch (error) {
          console.log("erro no loadUser", error);
          this.logout();
        }
      }
    },
  },
});
