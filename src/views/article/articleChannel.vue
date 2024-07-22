<script setup>
import { artDeleteChannelService, artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const channels = ref([])
const loading = ref(false)
const dialog = ref()

onMounted(async () => {
  loading.value = true
  await artGetChannelsService()
    .then((res) => {
      channels.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => (loading.value = false))
})

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('确定删除该分类吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  artDeleteChannelService(row.id)
    .then(() => {
      ElMessage.success('删除成功')
      onSuccess()
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('删除失败')
      onSuccess()
    })
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onSuccess = async () => {
  loading.value = true
  await artGetChannelsService()
    .then((res) => {
      channels.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => (loading.value = false))
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 新增分类 </el-button>
    </template>
    <template #main>
      <el-table v-loading="loading" :data="channels" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              circle
              plain
              :icon="Edit"
              @click="onEditChannel(row, $index)"
            ></el-button>
            <el-button
              type="danger"
              circle
              plain
              :icon="Delete"
              @click="onDeleteChannel(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据"></el-empty>
        </template>
      </el-table>
      <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </template>
  </page-container>
</template>
