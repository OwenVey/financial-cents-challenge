<template>
  <h1 class="text-3xl font-bold text-gray-100">Monthly Bookkeeping</h1>
  <p class="mt-2 text-gray-200">List of paid and outstanding invoices.</p>
  <div class="mt-10">
    <ClientsGrid />
  </div>
</template>

<script setup lang="ts">
import ClientsGrid from '@/ClientsGrid.vue';
</script>
