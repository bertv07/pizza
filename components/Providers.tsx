"use client"

import React from "react"
import { AuthProvider } from "@/hooks/useAuth"
import { CartProvider } from "@/hooks/useCart"
import { ThemeProvider } from "@/hooks/useTheme"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  )
}
