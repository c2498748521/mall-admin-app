<template>
  <a-form-model
    layout="inline"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
    class="search"
  >
    <a-form-model-item>
      <a-form-model-item has-feedback label="搜索关键字">
        <a-input v-model="formInline.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
    </a-form-model-item>
    <a-form-model-item has-feedback label="商品类目">
      <a-select
        show-search
        allowClear
        placeholder="请选择商品类目"
        option-filter-prop="children"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option
          v-for="option in categorys"
          :key="option.id"
          :value="option.name"
        >
          {{ option.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
    <a-button class="toGoodsAdd">
      <router-link to="/add">添加商品</router-link>
    </a-button>
  </a-form-model>
</template>
<script>
export default {
  props: ['categorys'],
  data() {
    return {
      formInline: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleChange(value, vNode) {
      // 有两个参数：第一个value值，第二个vNode
      this.formInline.category = vNode.key;
    },
    handleSubmit() {
      this.$emit('submit', this.formInline);
    },
  },
};
</script>
<style lang="less">
.search.ant-form {
  padding: 10px 30px;
  display: flex;
  align-items: center;
  .toGoodsAdd {
    margin-left: auto;
  }
}
</style>
