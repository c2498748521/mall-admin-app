<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.name]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="router in $store.state.routerMenu" :key="router.name">
        <span slot="title"
          ><a-icon :type="router.meta.icon" /><span>{{
            router.meta.title
          }}</span></span
        >
        <a-menu-item v-for="list in router.children" :key="list.name">
          <a-icon :type="list.meta.icon"></a-icon>
          {{ list.meta.title }}
          <router-link :to="list.path"> </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
