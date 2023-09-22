import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { init_db } from './utils/database';
import { createPinia } from "pinia"
const pinia = createPinia()
await init_db();
createApp(App).use(router).use(pinia).mount('#app')

