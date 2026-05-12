"use client";

import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LenisProvider>{children}</LenisProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "12px",
          },
        }}
      />
    </ThemeProvider>
  );
}
