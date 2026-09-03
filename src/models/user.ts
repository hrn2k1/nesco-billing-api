export interface UserDto {
  id: string;
  name: string;
  loginName: string;
  password?: string;
  provider?: string | 'app' | 'google' | 'facebook' | 'microsoft';
  email?: string;
  mobileNo?: string;
  createdAt: Date;
  updatedAt?: Date;
}
