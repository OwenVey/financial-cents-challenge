<template>
  <div v-if="isError">An error has occurred: {{ error }}</div>

  <div v-else>
    <ul class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      <template v-if="isFetching">
        <Skeleton v-for="i in data?.per_page ?? 6" :key="i" class="h-[198px]" />
      </template>
      <template v-else-if="data">
        <ClientCard v-for="client in data.clients" :key="client.id" :client />
      </template>
    </ul>
  </div>

  <div class="mt-8 grid grid-cols-3">
    <Button class="w-fit" @click="page--" :disabled="page === 1" aria-label="previous page">
      Previous
    </Button>

    <select
      v-model.number="page"
      class="mx-auto block w-16 rounded-md border-0 py-1.5 pl-4 pr-9 font-semibold text-gray-100 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-green-100"
      id="page"
      name="page"
      aria-label="Change page number"
    >
      <option v-for="i in data?.total_pages ?? 1" :key="i" :value="i">{{ i }}</option>
    </select>

    <Button
      class="ml-auto w-fit"
      @click="page++"
      :disabled="page === data?.total_pages || isFetching"
      aria-label="next page"
    >
      Next
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/ui/Button.vue';
import ClientCard from '@/ClientCard.vue';
import Skeleton from '@/ui/Skeleton.vue';
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { ref } from 'vue';
import { fetchClients } from '@/utils';

const page = ref(1);

const { isError, data, error, isFetching } = useQuery({
  queryKey: ['clients', page],
  queryFn: () => fetchClients(page.value),
  placeholderData: keepPreviousData,
  staleTime: Infinity,
});
</script>
