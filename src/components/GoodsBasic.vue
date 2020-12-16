<template>
  <div class="goodsBasic">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :labelCol="{span: 6}"
      :wrapperCol="{span: 12}"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="handleCategory"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_items" placeholder="请添加子类目">
          <a-select-option v-for="item in itemList" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          v-model="form.tags"
          mode="tags"
          :size="size"
          placeholder="Please select"
        >
          <a-select-option value="包邮，最晚次日送达">
            包邮，最晚次日送达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/categorys';

export default {
  props: ['form'],
  data() {
    return {
      size: 'default',
      categoryList: [],
      itemList: [],
      rules: {},
    };
  },
  created() {
    api.category().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    handleCategory(val) {
      this.categoryList.forEach((i) => {
        if (i.id === val) {
          this.itemList = i.c_items;
        }
      });
    },
  },
};
</script>
