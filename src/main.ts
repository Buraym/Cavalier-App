import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { init_db } from './utils/database';
import { createPinia } from "pinia"
await init_db();
createApp(App).use(router).use(createPinia()).mount('#app')
