import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";

import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore(pinia);

const initializeApp = async () => {
  await authStore.loadUser();

  // Configurar o guardião de rotas após o carregamento do authStore
  router.beforeEach((to, from, next) => {
    if (to.path === "/") {
      if (authStore.isAuthenticated) {
        next("/dashboard");
      } else {
        next("/login");
      }
    } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  });

  app.mount("#app");
};

initializeApp();
