<template>
  <div class="steps">
    <a-steps :current="current" class="steps-header">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 内容区域 -->
      <goods-basic v-if="current === 0" :form="form" @next="next"></goods-basic>
      <goods-sale
        v-else-if="current === 1"
        :form="form"
        @prev="prev"
        @submit="submit"
      ></goods-sale>
    </div>
  </div>
</template>
<script>
import GoodsBasic from './GoodsBasic.vue';
import GoodsSale from './GoodsSale.vue';

export default {
  props: ['form'],
  components: {
    GoodsBasic,
    GoodsSale,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],

    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    submit() {
      this.$emit('submit');
    },
  },
};
</script>
<style lang="less" scoped>
.steps {
  .steps-header {
    width: 50%;
    margin: 20px auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
