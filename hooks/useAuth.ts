"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const ensureProfileMemoized = React.useCallback(async (user: User) => {
    try {
      // Check if profile exists
      const { error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single()

      if (fetchError && fetchError.code === "PGRST116") {
        // Profile doesn't exist, create it
        const fullName = user.user_metadata?.full_name || ""
        await createUserProfile(user.id, fullName, user.email || "")
      }
    } catch (error) {
      console.error("Error ensuring profile:", error)
    }
  }, [])

  useEffect(() => {
    async function init() {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          ensureProfileMemoized(session.user)
        }
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user && event === "SIGNED_IN") {
          await ensureProfileMemoized(session.user)
        }
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    }

    init()
  }, [ensureProfileMemoized])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // Only try to create profile if user is confirmed (no email confirmation required)
      // or if we have a session
      if (data.user && (data.user.email_confirmed_at || data.session)) {
        await createUserProfile(data.user.id, fullName, email)
      }

      return { success: true }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error("Error en registro:", errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { success: true }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error("Error en login:", errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Forzar actualización del estado
      setUser(null)
      setSession(null)
      
      // Redirigir a la página de inicio
      router.push("/")
      router.refresh() // Forzar recarga de la página para asegurar la limpieza
    } catch (error) {
      console.error("Error en logout:", error)
      throw error // Relanzar el error para que el componente lo maneje
    }
  }

  const createUserProfile = async (userId: string, fullName: string, email: string) => {
    try {
      const { error } = await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: fullName,
          email: email,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("Supabase error details:", error)
        throw error
      }
    } catch (error) {
      console.error("Error creando perfil:", error)
      // Don't throw the error here to prevent signup failure
      // The profile can be created later when the user signs in
    }
  }



  const isAuthenticated = React.useCallback(() => {
    return user !== null
  }, [user])

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
