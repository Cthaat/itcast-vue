<script setup>
// import { useUserStore, useCounterStore } from '@/stores'

// const userStore = useUserStore()
// const counterStore = useCounterStore()

import zhCn from 'element-plus/dist/locale/zh-cn'
import { ElConfigProvider } from 'element-plus'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
