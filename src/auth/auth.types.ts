export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  roles: Role[];
}

export type SafeUser = Omit<User, 'password'>;

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  access_token: string;
}
