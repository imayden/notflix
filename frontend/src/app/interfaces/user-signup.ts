import { UserRole } from "./user-auth";

// export class AppUserRegister {
//     username?: string;
//     password?: string;
//     email?: string;
//     role?: UserRole;
  
//     constructor(init?: Partial<AppUserRegister>) {
//       Object.assign(this, init);
//     }
//   }
  
//   export interface UserInfo {
//     username: string;
//     email: string;
//     password: string;
//   }
  
  export class AppUserRegister {
    username: string = '';
    password: string = '';
    email: string = '';
    role: string = '';
    tmdb_key = "6b304a5a317d55e99cc042db50b03dab";
  }
  export interface UserInfo {
    email?: string;
    password?: string;
  
    username?: string;
  }