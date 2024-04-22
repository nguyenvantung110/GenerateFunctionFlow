<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { login } from '../services/authService';
  import { usePermissionsStore } from '../router/permissions.store';
  import { useRouter } from 'vue-router';
  import { mapState } from 'pinia';

  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const permissionsStore = usePermissionsStore();
  const authorPaths = permissionsStore.getPathList;
console.log(authorPaths)
  const handleLogin = async () => {
    try {
      await login({ username: username.value, password: password.value });
      router.push(authorPaths[0].url);
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error(error);
    }
  };

  function checkPermissions(val : string){
    console.log(permissionsStore)
    return false
  }
  </script>