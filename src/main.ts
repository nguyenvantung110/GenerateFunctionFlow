import { DirectiveBinding, createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'devextreme/dist/css/dx.light.css';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import indent from './views/directives/indent'
import { createPinia } from 'pinia';
import { userStore } from "./stores/userStore";

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
.use(router)
.use(pinia)
.directive('indent',indent)
.mount("#app");
const useUserStore = userStore()
