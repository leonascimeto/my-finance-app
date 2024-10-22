<template>
  <DefaultLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Despesas</h1>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Descrição -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Descrição</label>
            <input
              type="text"
              v-model="form.description"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ex: Compra de materiais"
              required
            />
          </div>
          <!-- Valor -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Valor</label>
            <input
              type="number"
              v-model.number="form.amount"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ex: 150.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <!-- Método de Pagamento -->
          <div>
            <label class="block text-gray-700 font-medium mb-2"
              >Método de Pagamento</label
            >
            <select
              v-model="form.payment_method"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="" disabled>Selecione</option>
              <option value="cartao_credito">Cartão de Crédito</option>
              <option value="cartao_debito">Cartão de Débito</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">Pix</option>
              <option value="boleto">Boleto</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <!-- Recorrência -->
          <div>
            <label class="block text-gray-700 font-medium mb-2"
              >Recorrência</label
            >
            <select
              v-model="form.recurrence"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="" disabled>Selecione</option>
              <option value="unico">Única</option>
              <option value="parcelado">Parcelado</option>
              <option value="recorrente">Recorrente</option>
            </select>
          </div>
          <!-- Parcelas (aparece somente se for parcelado) -->
          <div v-if="form.recurrence === 'parcelado'">
            <label class="block text-gray-700 font-medium mb-2"
              >Número de Parcelas</label
            >
            <input
              type="number"
              v-model.number="form.installments"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              min="1"
              required
            />
          </div>
          <!-- Status -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="" disabled>Selecione</option>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </select>
          </div>
  
          <!-- Botão de Submissão Alinhado -->
          <div class="md:col-span-2 flex justify-start">
            <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-colors"
            >
              Adicionar Despesa
            </button>
          </div>
        </div>
      </form>
  
      <!-- Lista de Despesas -->
      <div class="mt-10">
        <h2 class="text-xl font-bold mb-4">Despesas</h2>
        <draggable v-model="expenses" class="space-y-4">
          <transition-group>
            <div
              v-for="expense in expenses"
              :key="expense._id"
              class="bg-white shadow rounded px-4 py-6 flex flex-col"
            >
              <div class="flex justify-between items-start">
                <h3>{{ expense.description }}</h3>
                <p class="text-gray-600">Valor: R$ {{ expense.amount }}</p>
                <p class="text-gray-600">Método: {{ expense.payment_method }}</p>
                <p class="text-gray-600">Recorrência: {{ expense.recurrence }}</p>
                <p class="text-gray-600">Status: 
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs',
                      expense.status === 'pago'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800',
                    ]"
                  >
                   {{ expense.status === "pago" ? "Pago" : "Pendente" }}
                 </span>
                </p>
                <!-- Categorias -->
                <div class="mt-2 flex flex-wrap gap-2">
                    <span
                      v-for="category in expense.categories"
                      :key="category._id"
                      class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs flex items-center"
                    >
                      {{ category.name }}
                      <button
                        @click=""
                        class="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                   
                  <!--adicionar v-select-->
                  </div>
              </div>
              <div class= "flex space-x-2">
                <button
                    @click=""
                    class="text-blue-500 hover:text-blue-700"
                  >
                    ✏️
                  </button>
                <button
                    @click=""
                    class="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useExpenseStore } from "../stores/expenseStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    const expenseStore = useExpenseStore();
    const userStore = useAuthStore();
    const { expenses } = storeToRefs(expenseStore);

    const userId = userStore.user?._id;

    const form = reactive({
      description: "",
      amount: 0,
      payment_method: "dinheiro",
      recurrence: "unico",
      installments: 1,
      current_installment: 1,
      status: "pendente",
    });

    const onSubmit = async () => {
      const expenseData: any = {
        amount: form.amount,
        description: form.description,
        payment_method: form.payment_method,
        recurrence: form.recurrence,
        status: form.status,
        user: userId,
      };
      if (form.recurrence === "parcelado") {
        expenseData.installments = form.installments;
        expenseData.current_installment = form.current_installment;
      }
      await expenseStore.createExpense(expenseData);
      form.description = "";
      form.amount = 0;
      form.installments = 1;
      form.current_installment = 1;
    };

    onMounted(async () => {
      await expenseStore.fetchExpenses({ limit: 10, page: 1 });
    });

    return {
      form,
      onSubmit,
      expenses,
    };
  },
});
</script>
