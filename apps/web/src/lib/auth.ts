import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export type MeResponse = {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    provider: "EMAIL" | "GOOGLE";
  };
};

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get<MeResponse>("/auth/me");
      return res.data;
    },
    staleTime: 30_000,
    retry: false,
  });
}

export function useSignIn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const res = await api.post("/auth/sign-in", params);
      return res.data;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useSignUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      email: string;
      password: string;
      fullName?: string;
    }) => {
      const res = await api.post("/auth/sign-up", params);
      return res.data;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/sign-out");
      return res.data;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (params: { email: string }) => {
      const res = await api.post("/auth/forgot-password", params);
      return res.data as { ok: true };
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (params: { token: string; newPassword: string }) => {
      const res = await api.post("/auth/reset-password", params);
      return res.data as { ok: true };
    },
  });
}

