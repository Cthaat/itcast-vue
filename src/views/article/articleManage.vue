<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <button @click="goToLogin()">Go to login</button>
</template>
