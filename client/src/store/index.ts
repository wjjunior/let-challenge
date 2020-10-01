import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import home from "./modules/home";
import article from "./modules/article";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    home,
    article
  }
});
