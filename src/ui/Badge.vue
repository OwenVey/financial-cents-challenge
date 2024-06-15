<template>
  <span
    class="inline-flex items-center rounded-full px-2 py-1 text-[8px] font-semibold"
    :class="badgeClasses"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  color?: 'gray' | 'green' | 'red';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray',
});

const badgeClasses = computed(() => {
  return {
    'bg-green-300 text-green-100': props.color === 'green',
    'bg-red-300 text-red-200': props.color === 'red',
    'bg-gray-600 text-gray-100': props.color === 'gray',
  };
});
</script>
