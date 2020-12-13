import Vue from 'vue';
import Vuex from 'vuex';
import { setUserInfo, getUserInfo, removeUserInfo } from '@/utils/user';
import { filterHideMenu } from '@/utils/filterMenu';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 是否隐藏左部导航，false为不隐藏，true为隐藏
    userInfo: getUserInfo(), // 存放登录用户的信息
    routerMenu: [],
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    updateUserInfo(state, info) { // 将用户登录信息更新到userInfo对象
      state.userInfo = info;
      setUserInfo(info); // 将数据存到本地
    },
    loginOut(state) {
      state.userInfo = getUserInfo();
    },
    toggleRouterMenu(state, menu) {
      state.routerMenu = filterHideMenu(menu);
    },
  },
  actions: {
    ActionCollapsed({ commit }) {
      commit('toggleCollapsed');
    },
    ActionUserInfo({ commit }, info) {
      commit('updateUserInfo', info);
    },
    ActionLoginOut({ commit }) { // 退出登录
      removeUserInfo();
      commit('loginOut');
    },
    ActionRouterMenu({ commit }, menu) {
      commit('toggleRouterMenu', menu);
    },
  },
  modules: {
  },
});
