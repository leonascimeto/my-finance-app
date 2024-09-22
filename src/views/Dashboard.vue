<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="container flex items-center justify-between px-4 py-4 mx-auto">
        <h1 class="text-xl font-bold">Controle Financeiro</h1>
        <button @click="logout" class="text-red-500">Sair</button>
      </div>
    </nav>
    <main class="container px-4 py-6 mx-auto">
      <h2 class="mb-4 text-2xl font-bold">Dashboard</h2>
      <p>Bem-vindo ao seu painel de controle financeiro.</p>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const logout = () => {
      // Implementar lógica de logout
      authStore.logout()
      router.push('/login');
    };

    return { logout };
  },
});
</script>
