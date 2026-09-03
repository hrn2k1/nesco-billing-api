
export interface CreateUserInput {
  name: string;
  loginName: string;
  password?: string;
  provider?: 'app' | 'google' | 'facebook' | 'microsoft';
  email?: string;
  mobileNo?: string;
}

export interface UpdateUserInput {
  name: string;
  email?: string;
  mobileNo?: string;
}

export interface AppLoginInput {
  loginName: string;
  password: string;
}

export interface OAuthLoginInput {
  loginName: string;
  provider: 'google' | 'facebook' | 'microsoft';
  token: string;
}

export type LoginInput = AppLoginInput | OAuthLoginInput;

export interface ChangePasswordInput {
  password: string;
}

export interface LoginResponse {
    id: string;
    name: string;
    loginName: string;
    provider?: string;
    email?: string;
    mobileNo?: string | undefined;
    token: string;
}
