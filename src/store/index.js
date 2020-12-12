import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 是否隐藏左部导航，false为不隐藏，true为隐藏
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {

  },
  modules: {
  },
});
