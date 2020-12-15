import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import filterMenu from '../utils/filterMenu';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const routerMenu = [
  {
    path: '/goods',
    name: 'Goods',
    meta: {
      title: '商品',
      icon: 'inbox',
      show: true,
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/pages/GoodsList.vue'),
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          show: true,
        },
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/pages/GoodsAdd.vue'),
        meta: {
          title: '添加商品',
          icon: 'file-add',
          show: true,

        },
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/pages/GoodsEdit.vue'),
        meta: {
          title: '编辑商品',
          show: false,

        },
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/pages/Category.vue'),
        meta: {
          title: '商品类目',
          icon: 'project',
          show: true,

        },
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'Index',
    },
    meta: {
      title: '首页',
      icon: 'home',
      show: true,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'number',
          show: true,
        },
        component: () => import('@/views/pages/Index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      show: false,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  const { appkey, email, username } = store.state.userInfo;
  if (to.path !== '/login') {
    if (appkey && email && username) { // 如果已经登录
      if (!isAddRoutes) {
        const res = filterMenu(store.state.userInfo.role, routerMenu);
        store.dispatch('ActionRouterMenu', [...routes, ...res]).then(() => {
          router.addRoutes(res);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
