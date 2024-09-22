<!-- src/views/Home.vue -->
<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(() => {
      if (authStore.isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    });

    return {};
  },
});
</script>
