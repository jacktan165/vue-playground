import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';

import './global.scss';

createApp(App).use(VueQueryPlugin).mount('#app');
