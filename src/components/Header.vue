<template>
  <nav class="bg-white shadow">
    <div class="container flex items-center justify-between px-4 py-4 mx-auto">
      <h1 class="text-xl font-bold">Controle Financeiro</h1>
      <div class="flex space-x-4">
        <router-link to="/categories" class="text-blue-500 hover:underline">Categorias</router-link>
        <router-link to="/expenses" class="text-blue-500 hover:underline">Despesas</router-link>
        <button @click="logout" class="text-red-500">Sair</button>
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
