"use client";

import { GlobalProvider } from "./GlobalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
