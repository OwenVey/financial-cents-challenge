import App from '@/App.vue';
import '@/index.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

createApp(App).use(VueQueryPlugin).mount('#app');
