<template>
  <div class="home">
    <left-menu :key="key" />
    <div
      :class="{ 'main-app': true, 'menu-list-hide': $store.state.collapsed }"
    >
      <slide-nav :key="key" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import SlideNav from './components/SlideNav.vue';

export default {
  data() {
    return {
      key: Date.now(),
    };
  },
  components: {
    LeftMenu,
    SlideNav,
  },
  watch: {
    $route() {
      this.key = Date.now();
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
