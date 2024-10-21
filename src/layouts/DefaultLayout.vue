<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <main class="container px-4 py-6 mx-auto">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style scoped>
/* Adicione estilos se necessário */
</style>
