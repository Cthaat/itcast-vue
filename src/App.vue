<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goList = () => {
  router.push('/list')
  console.log('Go to list')
  console.log(route.path)
}
</script>

<template>
  <test-demo></test-demo>
  <div>
    <el-button @click="goList">Click me</el-button>
  </div>
</template>

<style scoped></style>
