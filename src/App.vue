<script setup>
import { useUserStore, useCounterStore } from '@/stores'

const userStore = useUserStore()
const counterStore = useCounterStore()
</script>

<template>
  <hr />
  <router-view></router-view>
  <hr />
  <hr />
  <test-demo></test-demo>
  <test-demo></test-demo>
  <div>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('test')">LogIn</el-button>
    <el-button @click="userStore.removeToken()">exit</el-button>
  </div>
  <div>
    <el-button @click="counterStore.addCount()">Add</el-button>
    <el-button @click="counterStore.subCount()">Sub</el-button>
    <p>{{ counterStore.count }}</p>
  </div>
</template>

<style scoped></style>
