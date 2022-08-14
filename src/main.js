// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import helpers from "@/plugins/helpers";
import IdleVue from "idle-vue";

Vue.use(BootstrapVue);
Vue.use(helpers);

const eventsHub = new Vue();

if (process.env.VUE_APP_ENV === "production") {
  Vue.use(IdleVue, {
    store: store,
    eventEmitter: eventsHub,
    idleTime: 120000,
  });
}

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App,
  },
  template: "<App/>",
});
