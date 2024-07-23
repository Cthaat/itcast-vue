<script setup>
import { Upload, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import channelSelect from './components/channelSelect.vue'
import { artGetArticlesService } from '@/api/article'
import { formatDate } from '@/utils/format'
import articleEdit from './components/articleEdit.vue'

const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const articleEditRef = ref()

const getArticleList = async () => {
  loading.value = true
  const res = await artGetArticlesService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

getArticleList()

const onUploadArticle = (row) => {
  // TODO 上传文章
  articleEditRef.value.open(row)
  console.log(row)
}

const onSuccess = (type) => {
  // TODO 上传成功
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

const onDeleteArticle = (row) => {
  // TODO 删除文章
  console.log(row)
}

const addArticle = () => {
  // TODO 新增文章
  articleEditRef.value.open()
}
const search = () => {
  // TODO 按照分类查找
  params.value.pagenum = 1
  getArticleList()
}

const reset = () => {
  // TODO 重置条件
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
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
          <channelSelect v-model:cateID="params.cate_id"></channelSelect>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="params.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="articleList">
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
      <articleEdit ref="articleEditRef" @success="onSuccess"></articleEdit>
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
