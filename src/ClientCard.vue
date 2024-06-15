<template>
  <li class="overflow-hidden rounded-xl bg-white shadow-md shadow-gray-600">
    <div class="flex items-center bg-green-100 p-5">
      <img
        class="size-11 rounded-lg"
        :src="client.avatar"
        :alt="`Headshot of ${client.first_name} ${client.last_name}`"
      />
      <div class="ml-3 font-semibold text-white">
        {{ client.first_name }} {{ client.last_name }}
      </div>

      <Dropdown class="ml-auto">
        <template #trigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </template>

        <template #items>
          <DropdownItem @click="() => console.log('View')">View</DropdownItem>
          <DropdownItem @click="() => console.log('Edit')">Edit</DropdownItem>
          <DropdownItem @click="() => console.log('Delete')" class="text-red-200">
            Delete
          </DropdownItem>
        </template>
      </Dropdown>
    </div>

    <dl class="p-5 text-gray-200">
      <div class="flex justify-between">
        <dt>Last invoice</dt>
        <dd class="text-right">
          {{
            client.lastInvoice.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </dd>
      </div>

      <div class="my-3 h-[2px] bg-gray-700"></div>

      <div class="flex justify-between">
        <dt>Amount</dt>
        <dd class="flex items-center text-right text-gray-100">
          {{ formatAsUSCurrency(client.amount) }}
          <Badge class="ml-2" :color="client.invoiceStatus === 'Paid' ? 'green' : 'red'">
            {{ client.invoiceStatus }}
          </Badge>
        </dd>
      </div>
    </dl>
  </li>
</template>

<script setup lang="ts">
import type { Client } from '@/types';
import { formatAsUSCurrency } from '@/utils';
import Badge from '@/ui/Badge.vue';
import { Dropdown, DropdownItem } from '@/ui/Dropdown';

defineProps<{
  client: Client;
}>();
</script>
