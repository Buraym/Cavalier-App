import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { init_db } from './utils/database';
await init_db();
createApp(App).use(router).mount('#app')
