"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import AuthProvider from "@/app/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function MainProvider({ children }:
     PropsWithChildren<unknown>) {
       return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>      
    </SessionProvider>
  );
}
