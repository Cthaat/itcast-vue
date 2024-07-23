<script setup>
import { ref } from 'vue'
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddArticleService } from '@/api/article'
const visibleDrawer = ref(false)
const imgUrl = ref('')
const emit = defineEmits(['success'])

const defaultModel = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})

const formModel = ref({ ...defaultModel.value })

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
  ],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传文章封面图', trigger: 'blur' }]
}

const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log(row)
  } else {
    formModel.value = { ...defaultModel.value }
  }
}

defineExpose({
  open
})

const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const onPublish = async (state) => {
  formModel.value.state = state
  visibleDrawer.value = false
  const fd = new FormData()
  for (const key in formModel.value) {
    fd.append(key, formModel.value[key])
    console.log(formModel.value[key])
  }
  await artAddArticleService(fd)
    .then(() => {
      ElMessage.success('发布成功')
      formModel.value = { ...defaultModel.value }
      emit('success', 'add')
    })
    .catch(() => {
      ElMessage.error('发布失败')
      visibleDrawer.value = true
    })
}
</script>

<template>
  <el-drawer v-model="visibleDrawer" title="上传文章" size="40%" direction="rtl">
    <el-form :model="formModel" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channelSelect v-model:cateID="formModel.cate_id"></channelSelect>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    margin-bottom: 20px;
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>

<style scoped>
.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar {
  display: block;
  max-height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
