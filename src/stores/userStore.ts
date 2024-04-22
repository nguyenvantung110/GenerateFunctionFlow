import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const userStore = defineStore('userStore', {
    state: () => ({ isLoggedIn: false, user: null }),
    actions: {
        login(userData : any) {
          // Gọi API đăng nhập và lưu trữ thông tin người dùng
          this.isLoggedIn = true
          this.user = userData
        },
        logout() {
          // Xóa thông tin người dùng và đăng xuất
          this.isLoggedIn = false
          this.user = null
        }
      }
})