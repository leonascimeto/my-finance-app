<!-- src/components/Modal.vue -->
<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
      <div class="px-4 py-2 border-b">
        <slot name="header"></slot>
      </div>
      <div class="px-4 py-4">
        <slot name="body"></slot>
      </div>
      <div class="px-4 py-2 border-t flex justify-end">
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
});
</script>

<style scoped>
/* Estilos adicionais para o modal se necessário */
</style>
