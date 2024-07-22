<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
function goToLogin() {
  router.push('/login')
}

const userStore = useUserStore()
</script>

<template>
  <button @click="goToLogin()">Go to login</button>
  <p>{{ userStore.token }}</p>
  <el-button type="primary" @click="userStore.removeToken()"
    >remove token
  </el-button>
</template>
