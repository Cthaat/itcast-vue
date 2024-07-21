<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()

const goList = () => {
  router.push('/list')
  console.log('Go to list')
  console.log(route.path)
}

const userStore = useUserStore()
</script>

<template>
  <test-demo></test-demo>
  <div>
    <el-button @click="goList">Click me</el-button>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('test')">LogIn</el-button>
    <el-button @click="userStore.removeToken()">exit</el-button>
  </div>
</template>

<style scoped></style>
