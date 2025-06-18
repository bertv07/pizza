"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { useTheme } from "@/hooks/useTheme"
import { CartModal } from "./CartModal"

// MenuLink Component
const MenuLink = ({ 
  href, 
  children, 
  icon, 
  className = '',
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  className?: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    className={`flex items-center px-4 py-3 text-sm rounded-lg text-[#191011] dark:text-white hover:bg-[#f5e6e7] dark:hover:bg-gray-800 transition-colors ${className}`}
    onClick={onClick}
  >
    <span className="mr-3 text-[#e8b4b7]">
      {icon}
    </span>
    {children}
  </Link>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { getTotalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const totalItems = getTotalItems()

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header 
        ref={menuRef}
        className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1e9ea] dark:border-b-gray-700 px-4 lg:px-10 py-3 bg-[#fbf9f9] dark:bg-gray-900 transition-colors duration-300 relative z-50"
      >
        <div className="flex items-center gap-4 text-[#191011] dark:text-white">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <Link
            href="/"
            className="text-[#191011] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] hover:text-[#e8b4b7] transition-colors"
          >
            Pizza Palace
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              href="/menu"
              className="text-[#191011] dark:text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
            >
              Menú
            </Link>
            <Link
              href="/locations"
              className="text-[#191011] dark:text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
            >
              Ubicaciones
            </Link>
            <Link
              href="/promotions"
              className="text-[#191011] dark:text-white text-sm font-medium leading-normal hover:text-[#e8b4b7] transition-colors"
            >
              Promociones
            </Link>
          </div>
          <div className="flex gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartModalOpen(true)}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e8b4b7] text-[#191011] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d4a1a4] transition-colors"
            >
              <span className="truncate">Carrito ({totalItems})</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex gap-2">
                <Link
                  href="/profile"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="truncate">Mi Perfil</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-red-500 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-600 transition-colors"
                >
                  <span className="truncate">Salir</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
              >
                <span className="truncate">Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white hover:bg-[#e8b4b7] dark:hover:bg-gray-600 transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            )}
          </button>

          {/* Cart Button Mobile */}
          <button
            onClick={() => setCartModalOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8b4b7] text-[#191011] hover:bg-[#d4a1a4] transition-colors relative"
            aria-label="Carrito de compras"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
              ></path>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Dropdown Menu Button - Improved */}
          <div className="relative ml-2" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isMenuOpen 
                  ? 'bg-[#e8b4b7] text-[#191011] rotate-90' 
                  : 'bg-[#f1e9ea] dark:bg-gray-700 text-[#191011] dark:text-white hover:bg-[#e8b4b7] dark:hover:bg-gray-600'
              }`}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              aria-label="Menú de navegación"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center">
                <span className={`block h-0.5 w-6 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

            {/* Overlay */}
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}

            {/* Menu Panel */}
            <div className={`fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#191011] dark:text-white">Menú</h2>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-[#e8b4b7] transition-colors"
                      aria-label="Cerrar menú"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                  <MenuLink 
                    href="/" 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </MenuLink>
                  
                  <MenuLink 
                    href="/menu" 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Menú
                  </MenuLink>
                  
                  <MenuLink 
                    href="/locations" 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ubicaciones
                  </MenuLink>
                  
                  <MenuLink 
                    href="/promotions" 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Promociones
                  </MenuLink>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  {user ? (
                    <div className="space-y-2">
                      <MenuLink 
                        href="/profile" 
                        icon={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mi Perfil
                      </MenuLink>
                      <button
                        onClick={async () => {
                          try {
                            await signOut()
                            // Cerrar el menú después de que se complete el cierre de sesión
                            setIsMenuOpen(false)
                          } catch (error) {
                            console.error("Error al cerrar sesión:", error)
                            // Opcional: Mostrar un mensaje de error al usuario
                          }
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <MenuLink 
                      href="/login" 
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                      }
                      className="bg-[#e8b4b7] text-[#191011] hover:bg-[#d4a1a4]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </MenuLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </>
  )
}
