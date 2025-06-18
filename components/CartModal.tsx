"use client"

import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para continuar")
      router.push("/login")
      return
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío")
      return
    }

    onClose()
    router.push("/checkout")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#191011] dark:text-white">Tu Carrito</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="space-y-3 mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Tu carrito está vacío</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-[#191011] dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 text-[#191011] dark:text-white"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-[#191011] dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 text-[#191011] dark:text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#191011] dark:text-white">Total: ${getTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#e8b4b7] text-[#191011] py-2 px-4 rounded-full font-bold hover:bg-[#d4a1a4] transition-colors"
              >
                Proceder al Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
