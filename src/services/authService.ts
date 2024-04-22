// authService.ts
import { mapState } from 'pinia';
import { usePermissionsStore } from '../router/permissions.store';
import { Role } from '../router/role.enum';
import {userStore} from '../stores/userStore'

export async function login(credentials: { username: string; password: string }) {
  // Xác thực người dùng với credentials
  // ...
  // Giả sử role được trả về từ API
  console.log(credentials)
  const useUserStore = userStore()
  useUserStore.login(credentials)
  const role = Role.ROLE_1;

  const permissionsStore = usePermissionsStore();
  permissionsStore.setRole(role);
}