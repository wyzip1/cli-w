import App from "./App.vue";
import { createApp } from "vue";
import "styles/_index.less";
import "styles/_reset.less";
import router from "./router";

createApp(App).use(router).mount("#root");
