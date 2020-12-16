<template>
  <div class="goodsEdit">
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
      form: [],
    };
  },
  created() {
    const { params } = this.$router.currentRoute;
    this.form = params;
  },
  methods: {
    handleSubmit() {
      api.edit(this.form).then((res) => {
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
