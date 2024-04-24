<template lang="">
    <div v-if="useUserStore.isLoggedIn"  class="loading-spinner">
        <div class="spinner"></div>
        <span>Loading...</span>
    </div>
</template>
<script setup lang="ts">
import {spinnerStore} from '../stores/spinnerStore'
import {userStore} from '../stores/userStore';

const useUserStore = userStore()
const spinner = spinnerStore()

</script>
<style scoped>
    .loading-spinner {
        position: absolute;
        top:0;
        left: 0;
        background-image: radial-gradient(circle farthest-corner at center, #3c4b576e 0%, #1c262b75 100%);;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100vw;
        z-index: 1000;
    }

    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>