<template>
  <div class="categorys">
    <Search :categorys="categorys" @submit="handleSubmit" />
    <goods-table :data="listData" :pagination="pagination"></goods-table>
  </div>
</template>
<script>
import Search from '@/components/Search.vue';
import GoodsTable from '@/components/GoodsTable.vue';
import categoryApi from '@/api/categorys';
import listApi from '@/api/list';

export default {
  components: {
    Search,
    GoodsTable,
  },
  data() {
    return {
      categorys: [], // 存放请求到的商品类目数据
      listData: [], // 存放表格数据
      formInline: {}, // 存放搜索组件传来的参数，（关键字、类目）
      pagination: {
        // 存放分页信息
        showSizeChanger: true, // 是否可以修改pageSize
        total: 1, // 数据总条数
      },
    };
  },
  created() {
    this.getCategorysData();
    this.getListAllData(); // 获取所有商品信息
  },
  methods: {
    handleSubmit(form) {
      this.formInline = form;
      this.getListAllData();
    },
    getCategorysData() {
      const params = {
        page: 1,
        size: 10,
      };
      categoryApi.category(params).then((res) => {
        // 获取类目数据
        this.categorys = res.data;
      });
    },
    getListAllData() {
      const params = {
        ...this.formInline,
      };
      listApi.listAll(params).then((res) => {
        this.pagination.total = res.total;
        this.listData = res.data;
        res.data.map((i) => { // 将类目的值从number类型数字变成string类型的中文
          const item = i;
          item.category = this.categorys[item.category - 1].name;
          return true;
        });
      });
    },
  },
};
</script>
