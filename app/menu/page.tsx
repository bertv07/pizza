"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string
}

const categories = [
  { id: "pizza", name: "Pizzas" },
  { id: "appetizer", name: "Aperitivos" },
  { id: "salad", name: "Ensaladas" },
  { id: "dessert", name: "Postres" },
  { id: "drink", name: "Bebidas" },
]

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentCategory, setCurrentCategory] = useState("pizza")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  
  // Cerrar el menú desplegable al hacer clic fuera
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("available", true).order("name")

      if (error) {
        if (error.code === "42P01") {
          // Table doesn't exist
          setDbError("La base de datos no está configurada. Por favor ejecuta los scripts de configuración.")
          setProducts(getFallbackProducts())
          return
        }
        throw error
      }
      setProducts(data || [])
    } catch (error) {
      console.error("Error loading products:", error)
      setProducts(getFallbackProducts())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])



  const getFallbackProducts = (): Product[] => {
    return [
      {
        id: 1,
        name: "Margherita",
        description: "Salsa de tomate clásica, mozzarella fresca, albahaca",
        price: 12.99,
        category: "pizza",
        image_url:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 2,
        name: "Pepperoni",
        description: "Pepperoni, mozzarella, salsa de tomate",
        price: 14.99,
        category: "pizza",
        image_url:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 3,
        name: "Vegetariana",
        description: "Verduras variadas, mozzarella, salsa de tomate",
        price: 13.99,
        category: "pizza",
        image_url:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 7,
        name: "Palitos de Ajo",
        description: "Palitos recién horneados con mantequilla de ajo",
        price: 6.99,
        category: "appetizer",
        image_url:
          "https://images.unsplash.com/photo-1549775568-bdb5c8b4e2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 11,
        name: "Ensalada César",
        description: "Lechuga romana, crutones, queso parmesano, aderezo César",
        price: 8.99,
        category: "salad",
        image_url:
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 14,
        name: "Tiramisu",
        description: "Postre italiano con sabor a café",
        price: 6.99,
        category: "dessert",
        image_url:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 17,
        name: "Refrescos",
        description: "Sabores variados",
        price: 2.99,
        category: "drink",
        image_url:
          "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ]
  }

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      router.push("/login")
      return
    }
    addToCart(product)
  }

  const filteredProducts = products.filter((product) => product.category === currentCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Cargando menú...</div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <p className="text-[#191011] dark:text-white tracking-light text-[32px] font-bold leading-tight">
              Nuestro Menú
            </p>
            <p className="text-[#8b5b5d] dark:text-gray-400 text-sm font-normal leading-normal">
              Explora nuestra deliciosa variedad de pizzas, aperitivos, ensaladas, postres y bebidas. Cada plato está
              elaborado con los mejores ingredientes y un toque de pasión.
            </p>
            {dbError && (
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded">
                <p className="text-sm">⚠️ {dbError}</p>
                <p className="text-xs mt-1">Mostrando datos de ejemplo mientras tanto.</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="mb-8" ref={dropdownRef}>
          <div className="relative inline-block w-full max-w-xs">
            <div className="relative">
              <button
                type="button"
                className="relative w-full bg-white dark:bg-gray-800 border border-[#e3d4d5] dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
              >
                <span className="flex items-center">
                  <span className="block truncate text-[#191011] dark:text-white">
                    {categories.find(c => c.id === currentCategory)?.name}
                  </span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
                <ul 
                  className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  role="listbox"
                  aria-labelledby="listbox-label"
                >
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-[#e8b4b7] hover:text-[#191011] ${
                        currentCategory === category.id ? 'bg-[#f5e6e7] dark:bg-gray-700' : 'text-gray-900 dark:text-white'
                      }`}
                      onClick={() => {
                        setCurrentCategory(category.id);
                        setIsOpen(false);
                      }}
                      role="option"
                      aria-selected={currentCategory === category.id}
                    >
                      <div className="flex items-center">
                        <span className={`block truncate ${
                          currentCategory === category.id ? 'font-semibold' : 'font-normal'
                        }`}>
                          {category.name}
                        </span>
                      </div>
                      {currentCategory === category.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#e8b4b7]">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#8b5b5d] dark:text-gray-400 text-lg">
                No hay productos disponibles en esta categoría
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 pb-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#191011] dark:text-white text-lg font-medium leading-normal">{product.name}</h3>
                  <p className="text-[#8b5b5d] dark:text-gray-400 text-sm font-normal leading-normal mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#191011] dark:text-white text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#e8b4b7] text-[#191011] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#d4a1a4] active:bg-[#c08f92] transition-colors whitespace-nowrap"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
