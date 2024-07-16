export interface AppUserAuth {
  id?: string;
  username?: string;
  email?: string;
  role?: UserRole;
  jwtToken?: string;
}

export enum UserRole {
  USER = 'USER',
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN'
}
