import App from './App.vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import store from './store/store';
import vuetify from './plugins/vuetify';
import router from './router'
import Vue from 'vue';

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB4I8WMEjtaiorSLBwYelykA-hgxQ1YEE4",
  authDomain: "neodeus-41a60.firebaseapp.com",
  databaseURL: "https://neodeus-41a60.firebaseio.com",
  projectId: "neodeus-41a60",
  storageBucket: "neodeus-41a60.appspot.com",
  messagingSenderId: "627141864837",
  appId: "1:627141864837:web:8e00681ae724910bb7a8ec",
  measurementId: "G-DGSEBN67DY"
};
firebase.initializeApp(config);

window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  // dispatch user
  store.dispatch('setUser', user);

  new Vue({
    vuetify,
    store,
    render: h => h(App),
    router: router,

  }).$mount('#app')

  // recursion - this function calls itself on auth state change
  unsubscribe();
});
