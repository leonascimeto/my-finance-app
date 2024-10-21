<template>
  <nav class="bg-white shadow">
    <div class="container flex items-center justify-between px-4 py-4 mx-auto">
      <router-link to="/dashboard" class="text-xl font-bold text-blue-500 hover:text-blue-700 transition-colors duration-300">
        Controle Financeiro
      </router-link>
      <div class="flex space-x-6">
        <router-link
          to="/dashboard"
          class="group relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Dashboard
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link
          to="/categories"
          class="group relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Categorias
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link
          to="/expenses"
          class="group relative text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Despesas
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <button
          @click="logout"
          class="group relative text-red-500 hover:text-red-700 transition-colors duration-300"
        >
          Sair
          <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-red-700 transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  </nav>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    return { logout };
  },
});
</script>

<style scoped>
/* Adicione estilos se necessário */
</style>
