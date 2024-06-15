<template>
  <div ref="dropdownContainer" class="relative inline-block">
    <button
      :id="buttonId"
      @click="toggleDropdown"
      @keydown.space="toggleDropdown"
      class="-m-1 rounded-full p-1 text-white hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white active:enabled:brightness-110"
      :class="isOpen && 'bg-green-200 brightness-110'"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      aria-label="More options"
    >
      <slot name="trigger" class="text-red-200" />
    </button>

    <div
      v-show="isOpen"
      class="absolute right-0 z-10 mt-1 w-28 overflow-hidden rounded bg-white py-1 shadow-lg"
      active
      role="menu"
      aria-label="Dropdown menu"
      :aria-labelledby="buttonId"
      :id="menuId"
      ref="dropdownMenu"
    >
      <renderItems />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getId } from '@/utils';
import { ref, onMounted, onUnmounted, nextTick, type VNode } from 'vue';

const buttonId = getId();
const menuId = getId();

const isOpen = ref(false);
const dropdownContainer = ref<HTMLDivElement | null>(null);
const dropdownMenu = ref<HTMLDivElement | null>(null);

const items = ref<HTMLButtonElement[]>([]);
const slots = defineSlots<{
  trigger(): VNode;
  items(): VNode[];
}>();

const renderItems = () => {
  return slots.items().map((vnode, index) => {
    const props = {
      ...vnode.props,
      onClick: () => {
        vnode.props?.onClick?.();
        isOpen.value = false;
      },
      onkeydown: (e: KeyboardEvent) => onItemKeydown(e, index),
    };

    return { ...vnode, props };
  });
};

const toggleDropdown = (e: KeyboardEvent | MouseEvent) => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && e.type === 'keydown') {
    nextTick(() => {
      items.value[0]?.focus();
    });
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownContainer.value &&
    event.target instanceof Node &&
    !dropdownContainer.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

const onItemKeydown = (event: KeyboardEvent, index: number) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (index < items.value.length - 1) {
        items.value[index + 1].focus();
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (index > 0) {
        items.value[index - 1].focus();
      }
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      items.value[index].click();
      isOpen.value = false;
      break;
    case 'Escape':
      isOpen.value = false;
      break;
  }
};

const onDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  items.value = [...dropdownMenu.value!.children] as HTMLButtonElement[];
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', onDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', onDocumentKeydown);
});
</script>
