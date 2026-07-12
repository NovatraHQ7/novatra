export type AuthProvider = 'EMAIL' | 'GOOGLE';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  provider: AuthProvider;
}