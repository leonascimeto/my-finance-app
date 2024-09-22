<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold text-center">Cadastro</h2>
      <form @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm">Email</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label class="block text-sm">Senha</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label class="block text-sm">Confirme a Senha</label>
          <input v-model="confirmPassword" type="password" required class="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" class="w-full py-2 mt-4 text-white bg-green-500 rounded">Cadastrar</button>
      </form>
      <p class="text-center">
        Já tem uma conta?
        <router-link to="/login" class="text-blue-500">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter();

    const onSubmit = () => {
      if (password.value !== confirmPassword.value) {
        alert('As senhas não correspondem');
        return;
      }
      // Implementar lógica de cadastro
      router.push('/dashboard');
    };

    return { email, password, confirmPassword, onSubmit };
  },
});
</script>
