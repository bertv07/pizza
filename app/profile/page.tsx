"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { supabase } from "@/lib/supabase"

interface Profile {
  id: string
  email: string
  full_name: string
  phone: string
  address: string
}

interface Order {
  id: string
  total: number
  status: string
  delivery_address: string
  created_at: string
  order_items: {
    product_name: string
    quantity: number
    price: number
  }[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    loadProfile()
    loadOrderHistory()
  }, [isAuthenticated, user, router])

  const loadProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error && error.code !== "PGRST116") {
        throw error
      }

      if (data) {
        setProfile(data)
      } else {
        // Create default profile
        setProfile({
          id: user.id,
          email: user.email || "",
          full_name: "",
          phone: "",
          address: "",
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const loadOrderHistory = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            product_name,
            quantity,
            price
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error loading order history:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile || !user) return

    setUpdating(true)

    try {
      const { error } = await supabase.from("profiles").upsert([
        {
          id: user.id,
          email: user.email,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          updated_at: new Date().toISOString(),
        },
      ])

      if (error) throw error

      alert("Perfil actualizado exitosamente")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error al actualizar el perfil")
    } finally {
      setUpdating(false)
    }
  }

  const reorderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select("product_id, product_name, price, quantity")
        .eq("order_id", orderId)

      if (error) throw error

      // Add items to cart
      data.forEach((item) => {
        const product = {
          id: item.product_id || 0,
          name: item.product_name,
          price: item.price,
        }

        for (let i = 0; i < item.quantity; i++) {
          addToCart(product)
        }
      })

      alert("Productos agregados al carrito")
    } catch (error) {
      console.error("Error reordering:", error)
      alert("Error al agregar productos al carrito")
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      preparing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      out_for_delivery: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Pendiente",
      confirmed: "Confirmado",
      preparing: "Preparando",
      out_for_delivery: "En Camino",
      delivered: "Entregado",
      cancelled: "Cancelado",
    }
    return texts[status as keyof typeof texts] || "Desconocido"
  }

  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Redirigiendo...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Cargando perfil...</div>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#191011] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Mi Perfil
          </p>
        </div>

        {/* Personal Information */}
        <h3 className="text-[#191011] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Información Personal
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mx-4 mb-6 shadow-sm">
          <form onSubmit={updateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={profile?.full_name || ""}
                  onChange={(e) => setProfile(profile ? { ...profile, full_name: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Email</label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={profile?.phone || ""}
                  onChange={(e) => setProfile(profile ? { ...profile, phone: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Dirección</label>
                <input
                  type="text"
                  value={profile?.address || ""}
                  onChange={(e) => setProfile(profile ? { ...profile, address: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors disabled:opacity-50"
              >
                {updating ? "Actualizando..." : "Actualizar Información"}
              </button>
            </div>
          </form>
        </div>

        {/* Order History */}
        <h3 className="text-[#191011] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Historial de Pedidos
        </h3>
        <div className="space-y-4 px-4">
          {orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center">
              <p className="text-[#8b5b5d] dark:text-gray-400">No tienes pedidos aún.</p>
              <a
                href="/menu"
                className="inline-block mt-4 bg-[#e8b4b7] text-[#191011] px-6 py-2 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
              >
                Ver Menú
              </a>
            </div>
          ) : (
            orders.map((order) => {
              const orderDate = new Date(order.created_at).toLocaleDateString("es-ES")
              const statusColor = getStatusColor(order.status)
              const statusText = getStatusText(order.status)

              return (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-[#191011] dark:text-white">Pedido #{order.id.slice(-6)}</h4>
                      <p className="text-[#8b5b5d] dark:text-gray-400 text-sm">{orderDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>{statusText}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-[#191011] dark:text-white">
                          {item.quantity}x {item.product_name}
                        </span>
                        <span className="text-[#191011] dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-[#8b5b5d] dark:text-gray-400">
                        Total:{" "}
                        <span className="font-bold text-[#191011] dark:text-white">${order.total.toFixed(2)}</span>
                      </p>
                      <p className="text-sm text-[#8b5b5d] dark:text-gray-400">Entrega: {order.delivery_address}</p>
                    </div>
                    <button
                      onClick={() => reorderItems(order.id)}
                      className="bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
                    >
                      Volver a Pedir
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
