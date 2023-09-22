import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import { init_db } from './utils/database';
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router';

const i18n = createI18n({
    locale: "pt",
    fallbackLocale: "pt",
    messages: { pt, en, es },
  });

const pinia = createPinia()
await init_db();


