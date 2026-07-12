import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(72),
  fullName: z.string().trim().min(1).max(120).optional(),
});
export type SignUpDto = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
export type SignInDto = z.infer<typeof signInSchema>;

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().email(),
});
export type RequestPasswordResetDto = z.infer<
  typeof requestPasswordResetSchema
>;

export const resetPasswordSchema = z.object({
  token: z.string().min(32).max(256),
  newPassword: z.string().min(8).max(72),
});
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;