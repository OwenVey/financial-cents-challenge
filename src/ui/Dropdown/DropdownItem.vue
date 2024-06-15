<template>
  <button
    class="block w-full cursor-pointer px-3 py-1.5 text-left text-sm text-gray-100 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
    tabindex="0"
    role="menuitem"
    aria-orientation="vertical"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuItem = ref<HTMLButtonElement | null>(null);

defineExpose({ menuItem });
</script>
