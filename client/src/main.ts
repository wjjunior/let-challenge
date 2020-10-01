import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { CHECK_AUTH } from "./store/actions";
import { dateFilter, errorFilter } from "./helpers/filters";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.filter("error", errorFilter);
Vue.filter('truncate', (value: string, limit: number) => {
  return value.substring(0, limit)
})
Vue.filter('tailing', (value: string, tail: string) => {
  return value + tail
})

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(() => next())
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
