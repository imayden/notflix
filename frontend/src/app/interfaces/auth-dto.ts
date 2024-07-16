import { UserRole } from "./user-auth";

export interface AuthDto {
    accessToken: string;
    role: UserRole;
  }
  