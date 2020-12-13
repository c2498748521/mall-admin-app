<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="">{{ titleChildren }}</a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>欢迎{{ $store.state.userInfo.username }} <a-icon type="down" /></li>
      <li @click="loginOut">退出登录</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: this.$router.currentRoute.matched[0].meta.title,
      titleChildren: this.$router.currentRoute.meta.title,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('ActionCollapsed');
    },
    loginOut() {
      this.$store.dispatch('ActionLoginOut');
      this.$router.push({ name: 'Login' });
    },
  },
  watch: {
    '$route.path': function () {
      this.title = this.$router.currentRoute.matched[0].meta.title;
      this.titleChildren = this.$router.currentRoute.meta.title;
    },
  },
};
</script>
