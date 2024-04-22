<template lang="">
    <nav class="nav-bar" v-if="useUserStore.isLoggedIn">
    <router-link v-for="item in authorPaths" :to="item.url">{{item.title}}</router-link>
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/flow">Flow</router-link> |
    <router-link to="/grid">Grid</router-link> -->
    <a href="#" @click="logout()">Logout</a> 
  </nav>
</template>
<script setup lang="ts">
import { usePermissionsStore } from '@/router/permissions.store';
import { userStore } from '@/stores/userStore';
import {ref} from 'vue'

const permissionsStore = usePermissionsStore();
const authorPaths = permissionsStore.getPathList;
const useUserStore = userStore()

function logout(){
  useUserStore.logout()
}
</script>
<style scoped>
  .nav-bar{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
</style>