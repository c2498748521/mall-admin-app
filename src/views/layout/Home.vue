<template>
  <div class="home">
    <left-menu />
    <div :class="{ 'main-app': true, 'menu-list-hide': $store.state.collapsed }">
      <slider-nav />
    </div>
  </div>
</template>

<script>
import SliderNav from './components/SliderNav.vue';
import LeftMenu from './components/LeftMenu.vue';

export default {
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
