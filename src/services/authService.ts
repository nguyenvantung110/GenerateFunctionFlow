// authService.ts
import { mapState } from 'pinia';
import { usePermissionsStore } from '../router/permissions.store';
import { Role } from '../router/role.enum';
import {userStore} from '../stores/userStore'
import { AccountList } from '@/views/data/account';
import { ref } from 'vue';

export async function login(credentials: { username: string; password: string }) {
  // Xác thực người dùng với credentials
  // ...
  // Giả sử role được trả về từ API
  const useUserStore = userStore()
  const role = ref('');

  const loginAccount = AccountList.find(f => f.username === credentials.username)

  console.log(loginAccount)

  const permissionsStore = usePermissionsStore();

  if(loginAccount && loginAccount.password === credentials.password)
  {

    useUserStore.login(credentials)
    role.value = loginAccount.role
    permissionsStore.setRole(role.value);
  }
  else{
    permissionsStore.authorPaths.length = 0
  }
}