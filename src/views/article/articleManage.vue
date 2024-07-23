<script setup>
import { Upload, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import channelSelect from './components/channelSelect.vue'
import { artGetArticlesService } from '@/api/article'
import { formatDate } from '@/utils/format'

const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cateID: '',
  state: ''
})

const getArticleList = async () => {
  const res = await artGetArticlesService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
}

const onSizeChange = (size) => {
  console.log(size)
}

const onCurrentChange = (page) => {
  console.log(page)
}

getArticleList()

const onUploadArticle = (row) => {
  console.log(row)
}

const onDeleteArticle = (row) => {
  console.log(row)
}

const addArticle = () => {
  // TODO 新增文章
  console.log('新增文章')
}
const search = () => {
  // TODO 按照分类查找
}

const reset = () => {
  // TODO 重置条件
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArticle">新增文章</el-button>
    </template>
    <template #main>
      <el-form inline>
        <el-form-item label="文章分类：">
          <channelSelect v-model:cateID="params.cateID"></channelSelect>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="params.state">
            <el-option label="已发布" value="1"></el-option>
            <el-option label="未发布" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="articleList">
        <el-table-column label="文章标题" prop="title">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template #default="{ row }">
            {{ formatDate(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default="{ row, $index }">
            <el-tooltip content="发表" placement="top">
              <el-button
                type="primary"
                circle
                plain
                :icon="Upload"
                @click="onUploadArticle(row, $index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                circle
                plain
                :icon="Delete"
                @click="onDeleteArticle(row, $index)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 5, 10]"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </template>
  </page-container>
</template>

<style lang="scss" scoped>
.el-form {
  display: flex;
  gap: 10px;
  align-items: center;
  .el-form-item {
    flex: 1;
  }
}

.el-pagination {
  display: flex;
  margin-top: 20px;
  flex: 1;
  justify-content: flex-end;
}
</style>
