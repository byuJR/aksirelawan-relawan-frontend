import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createHead } from "@vueuse/head"; // Import untuk menggunakan head

const app = createApp(App);

// Menggunakan head untuk metadata (title dan meta tags)
const head = createHead();
app.use(head);

// Menggunakan router
app.use(router);

// Memasang aplikasi Vue ke dalam DOM
app.mount("#app");
