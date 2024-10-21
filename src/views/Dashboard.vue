<template>
  <DefaultLayout>
    <h2 class="mb-4 text-2xl font-bold">Dashboard</h2>
    <p>Bem-vindo ao seu painel de controle financeiro.</p>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue"; // ajuste o caminho conforme necessário

export default defineComponent({
  components: {
    DefaultLayout,
  },
});
</script>
