"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    const result = await signUp(email, password, name)

    if (result.success) {
      alert("Registro exitoso. Por favor verifica tu email si es necesario.")
      router.push("/login")
    } else {
      alert("Error: " + result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fbf9f9] dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="size-12 text-[#e8b4b7]">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#191011] dark:text-white">Pizza Palace</h2>
          <p className="mt-2 text-center text-sm text-[#8b5b5d] dark:text-gray-400">Crea tu cuenta</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#191011] dark:text-white">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#191011] dark:text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#191011] dark:text-white">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-[#8b5b5d] dark:text-gray-400">Mínimo 6 caracteres</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#191011] dark:text-white">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#191011] bg-[#e8b4b7] hover:bg-[#d4a1a4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8b4b7] transition-colors disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#8b5b5d] dark:text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-[#e8b4b7] hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-[#8b5b5d] dark:text-gray-400 hover:text-[#e8b4b7] transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
