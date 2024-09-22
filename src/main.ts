import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore(pinia);

// Configurar o guardião de rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

const initializeApp = async () => {
  await authStore.loadUser();
  app.mount("#app");
};

initializeApp();
