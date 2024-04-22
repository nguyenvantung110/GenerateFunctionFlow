// permissions.store.ts
import { defineStore } from 'pinia';
import { Role } from './role.enum';
import { Permissions } from './permissions.interface';
import { AuthorPath } from './authorpath';

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    role: '' as Role,
    permissions: {} as Permissions,
    authorPaths : [] as AuthorPath[]
  }),
  actions: {
    setRole(role: Role) {
      this.role = role;
      this.updatePermissions();
    },
    updatePermissions() {
        this.authorPaths.length = 0
      switch (this.role) {
        case Role.ROLE_1:
          this.permissions = {
            menu1: true,
            menu2: true,
            menu3: true,
          };
          this.authorPaths.push(new AuthorPath(1,'Home','/'),new AuthorPath(1,'About','/about'),new AuthorPath(1,'Flow','/flow'),new AuthorPath(1,'Grid','/grid'))
          break;
        case Role.ROLE_2:
          this.permissions = {
            menu1: true,
            menu2: true,
            menu3: false,
          };
          this.authorPaths.push(new AuthorPath(1,'Home','/'),new AuthorPath(1,'About','/about'))
          break;
        case Role.ROLE_3:
            console.log('role3')
          this.permissions = {
            menu1: false,
            menu2: false,
            menu3: true,
          };
          this.authorPaths.push(new AuthorPath(1,'Flow','/flow'),new AuthorPath(1,'Grid','/grid'))
          break;
        default:
          this.permissions = {
            menu1: false,
            menu2: false,
            menu3: false,
          };
          this.authorPaths = []
      }
    },
  },
  getters: {
    getPermissions: (state) => state.permissions,
    getPathList :(state) => state.authorPaths
  },
});