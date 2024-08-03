import { createApp } from "vue";
import "./output.css";
import { plugin, defaultConfig } from "@formkit/vue";
import { createPinia } from "pinia";
import fkconfig from "../formkit.config.ts";
import App from "./App.vue";
import router from "./router/index.ts";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig(fkconfig));

app.mount("#app");
