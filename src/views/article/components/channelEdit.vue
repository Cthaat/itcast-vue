<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑分类"
    width="30%"
    :before-close="handleClose"
  >
    <span>内容</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
