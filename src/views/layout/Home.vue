<template>
  <div class="home">
    <left-menu />
    <div
      :class="{ 'main-app': true, 'menu-list-hide': $store.state.collapsed }"
    >
      <slide-nav></slide-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import SlideNav from './components/SlideNav.vue';

export default {
  components: {
    LeftMenu,
    SlideNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
