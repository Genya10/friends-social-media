"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import AuthProvider from "@/app/providers/AuthProvider";

export default function MainProvider({ children }:
     PropsWithChildren<unknown>) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
