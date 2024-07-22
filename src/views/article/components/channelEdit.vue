<script setup>
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ref } from 'vue'
const dialogVisible = ref(false)
const formRef = ref()
const fromModel = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const rules = ref({
  cate_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  cate_alias: [{ required: true, message: '请输入分类别名', trigger: 'blur' }]
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = fromModel.value.id
  if (isEdit) {
    await artEditChannelService(fromModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(fromModel.value)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  fromModel.value = row
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="fromModel.cate_name ? '编辑分类' : '新增分类'"
    width="30%"
    :before-close="handleClose"
    class="dialog"
  >
    <el-form :model="fromModel" :rules="rules" class="form" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="fromModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="fromModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  display: flex;
  .form {
    margin: 20px auto;
  }
}
</style>
