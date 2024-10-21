<template>
  <DefaultLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Categorias</h1>
      <form @submit.prevent="onSubmit" class="mb-6">
        <div class="mb-4">
          <label class="block text-gray-700">Nome</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Descrição</label>
          <textarea
            v-model="form.description"
            class="w-full px-3 py-2 border rounded"
            required
          ></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Categoria
        </button>
      </form>
      <ul>
        <li v-for="category in categories" :key="category._id" class="mb-2">
          <h2 class="font-semibold">{{ category.name }}</h2>
          <p>{{ category.description }}</p>
        </li>
      </ul>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useCategoryStore } from "../stores/categoryStore";
import type { Category } from "@/types/category";
import { storeToRefs } from "pinia";
import DefaultLayout from "../layouts/DefaultLayout.vue"; // ajuste o caminho conforme necessário

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const { categories } = storeToRefs(categoryStore);

    const form = reactive({
      name: "",
      description: "",
    });

    const onSubmit = async () => {
      await categoryStore.createCategory({ ...(form as Category) });
      form.name = "";
      form.description = "";
    };

    onMounted(async () => {
      await categoryStore.fetchCategories({ limit: 10, page: 1 });
    });

    return {
      form,
      onSubmit,
      categories,
    };
  },
});
</script>

<style scoped></style>
