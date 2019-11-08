import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

import Vuetify from 'vuetify/lib';
import { firestorePlugin } from 'vuefire'

Vue.use(Vuetify);
Vue.use(firestorePlugin);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
});
