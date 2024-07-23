<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const cateID = defineModel('cateID')
const channelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}

getChannelList()
</script>

<template>
  <el-select v-model="cateID">
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>
