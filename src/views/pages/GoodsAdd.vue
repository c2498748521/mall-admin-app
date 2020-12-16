<template>
  <div class="goodsAdd">
    <Steps :form="form" @submit="handleSubmit" />
  </div>
</template>
<script>
import Steps from '@/components/Steps.vue';
import api from '@/api/goods';

export default {
  components: {
    Steps,
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: null,
        c_items: [],
        tags: [],
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        images: [],
        status: 0,
      },
    };
  },
  methods: {
    handleSubmit() {
      api.add(this.form).then((res) => {
        if (res) {
          this.$message.success('编辑成功'); // 气泡提示
          this.$router.push({
            // 切换路由
            name: 'List',
          });
        }
      });
    },
  },
};
</script>
