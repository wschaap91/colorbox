import { createApp } from "vue";
import "./style.css";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";

const app = createApp(App);

//Setup for Formkit
app.use(plugin, defaultConfig);

app.mount("#app");
