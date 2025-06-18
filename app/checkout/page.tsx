"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { supabase } from "@/lib/supabase"

export default function CheckoutPage() {
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, isAuthenticated } = useAuth()
  const { cart, clearCart, getTotal } = useCart()
  const router = useRouter()

  const deliveryFee = 2.99
  const taxRate = 0.08
  const subtotal = getTotal()
  const tax = subtotal * taxRate
  const total = subtotal + deliveryFee + tax

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    if (cart.length === 0) {
      router.push("/menu")
      return
    }
  }, [isAuthenticated, cart, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user!.id,
            subtotal: subtotal,
            delivery_fee: deliveryFee,
            tax: tax,
            total: total,
            delivery_address: deliveryAddress,
            city: city,
            postal_code: postalCode,
            phone: phone,
            special_instructions: specialInstructions,
            payment_method: paymentMethod,
            status: "pending",
          },
        ])
        .select()

      if (orderError) throw orderError

      // Create order items
      const orderId = orderData[0].id
      const orderItems = cart.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart and redirect
      clearCart()
      alert("¡Pedido confirmado! Recibirás una confirmación por email.")
      router.push("/profile")
    } catch (error) {
      console.error("Error al procesar el pedido:", error)
      alert("Error al procesar el pedido. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated() || cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Redirigiendo...</div>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#191011] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Finalizar Pedido
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-[#191011] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
              Resumen del Pedido
            </h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#191011] dark:text-white">{item.name}</h4>
                    <p className="text-sm text-[#8b5b5d] dark:text-gray-400">Cantidad: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-[#191011] dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b5b5d] dark:text-gray-400">Subtotal:</span>
                <span className="text-[#191011] dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b5b5d] dark:text-gray-400">Delivery:</span>
                <span className="text-[#191011] dark:text-white">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b5b5d] dark:text-gray-400">Impuestos:</span>
                <span className="text-[#191011] dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span className="text-[#191011] dark:text-white">Total:</span>
                <span className="text-[#191011] dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-[#191011] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
              Información de Entrega
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">
                  Dirección de Entrega
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                  placeholder="Ingresa tu dirección completa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Ciudad</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Código Postal</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">Teléfono</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">
                  Instrucciones Especiales (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                  placeholder="Ej: Tocar el timbre, apartamento 2B, etc."
                />
              </div>

              <h4 className="text-[#191011] dark:text-white text-md font-bold leading-tight tracking-[-0.015em] mt-6 mb-3">
                Método de Pago
              </h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                  />
                  <span className="text-[#191011] dark:text-white">Tarjeta de Crédito/Débito</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-[#e8b4b7] focus:ring-[#e8b4b7]"
                  />
                  <span className="text-[#191011] dark:text-white">Efectivo al Entregar</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        required={paymentMethod === "card"}
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#191011] dark:text-white mb-1">CVV</label>
                      <input
                        type="text"
                        required={paymentMethod === "card"}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2 border border-[#e3d4d5] dark:border-gray-600 rounded-md focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] dark:bg-gray-700 dark:text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8b4b7] text-[#191011] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#d4a1a4] transition-colors mt-6 disabled:opacity-50"
              >
                {loading ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
