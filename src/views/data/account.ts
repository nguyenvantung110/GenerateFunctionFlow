import { Role } from "@/router/role.enum";

export interface Account
{
    username : string,
    password : string,
    role : Role
}

export const AccountList : Account[] = [
    {
        username : 'admin',
        password : '123',
        role : Role.ROLE_1
    },
    {
        username : 'tungnv',
        password : '123',
        role : Role.ROLE_2
    },
    {
        username : 'loctt',
        password : '123',
        role : Role.ROLE_3
    }
]