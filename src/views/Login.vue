<template>
    <div class="login-page">
        <div class="login-form">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="username">
                    <label for="username">Username</label>
                    <input v-model="username" placeholder="username" />
                </div>
                <div class="password">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" placeholder="password" />
                </div>
                <div class="login-function">
                    <button class="login-btn" type="submit">Login</button>
                    <a class="forgot-password" href="">Forgot password</a>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { login } from '../services/authService';
  import { usePermissionsStore } from '../router/permissions.store';
  import { useRouter } from 'vue-router';
  import { mapState } from 'pinia';
  import { spinnerStore} from '../stores/spinnerStore'
  import Spinner from '../components/spinner.vue'

  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const permissionsStore = usePermissionsStore();
  const authorPaths = permissionsStore.getPathList;
  const spinner = spinnerStore()

  const handleLogin = async () => {
    try {
      spinner.show()
      setTimeout(async () => {
        await login({ username: username.value, password: password.value });
       router.push(authorPaths[0].url);
      },0);
      spinner.hide()
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error(error);
      authorPaths.length = 0
      spinner.hide()
    }
  };

  function checkPermissions(val : string){
    console.log(permissionsStore)
    return false
  }
  </script>
<style scoped>
    .login-page{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form{
        border: 1px solid #aaa;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap : 1rem;
        box-shadow: 0px 0px 10px 5px #e7e7e7;
        width: fit-content;
    }

    .login-form form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .login-form form input {
        border: 1px solid #aaa;
        border-radius: 5px;
        padding: 0.5rem;
    }

    .login-form form input:focus{
        outline: none;
    }

    .username,.password{
        display: flex;
        flex-direction: row;
        gap:1rem;
        align-items: center;
        justify-content: center;
    }

    .login-function{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .login-btn{
        background: #2cc491;
        padding: 0.5rem;
        border-radius: 5px;
        flex-basis: 50%;
        font-weight: 600;
        transition: 0.3s ease;
    }

    .login-btn:hover {
        transform: scale(1.05);
        letter-spacing: 0.1rem;
    }

    .forgot-password{
        text-decoration: none;
        color: #23a378;
    }
</style>