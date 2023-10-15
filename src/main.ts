import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import { init_db } from './utils/database';
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router';
import Toast, { POSITION, PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css";

const i18n = createI18n({
    locale: "pt",
    fallbackLocale: "pt",
    messages: { pt, en, es },
  });

const pinia = createPinia()
await init_db();
const option:PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

createApp(App).use(router).use(pinia).use(i18n).use(Toast, option).mount('#app')

