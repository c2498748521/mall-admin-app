<template>
  <div class="goodsSale">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 12 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model.number="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model.number="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model.number="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="上架状态" prop="status" required>
        <a-select
          placeholder="请选择上架状态"
          @change="handleChangeStatus"
        >
        <a-select-option value="1">上架</a-select-option>
        <a-select-option value="0">下架</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <div class="clearfix">
          <a-upload
            :action="`http://mallapi.duyiedu.com/upload/images?appkey=${$store.state.userInfo.appkey}`"
            list-type="picture-card"
            :file-list="fileList"
            v-model="form.images"
            name="avatar"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="prev"> 上一步 </a-button>
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      size: 'default',
      rules: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  created() {
    const { images } = this.form;
    images.forEach((item, index) => {
      this.fileList.push({
        uid: index,
        name: `image${index}.png`,
        status: 'done',
        url: item,
      });
    });
  },
  methods: {
    prev() {
      this.$emit('prev');
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const f = file;
      if (!file.url && !file.preview) {
        f.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList, file }) {
      this.fileList = fileList;
      if (file.status === 'done') { // 上传完成
        const { url } = file.response.data;
        this.form.images.push(url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        const i = this.form.images.indexOf(url);
        this.form.images.splice(i, 1);
      }
    },
    handleChangeStatus(val) {
      this.form.status = val;
    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
