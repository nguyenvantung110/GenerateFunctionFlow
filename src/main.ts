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


const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
.use(router)
.directive('indent',indent)
.mount("#app");
