"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { FeaturedPizzasCarousel } from "@/components/FeaturedPizzasCarousel"
import { Product, Testimonial } from "@/types"

export default function HomePage() {
  const [featuredPizzas, setFeaturedPizzas] = useState<Product[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const loadFeaturedPizzas = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "pizza")
        .eq("featured", true)

      if (error) throw error
      setFeaturedPizzas(data || [])
    } catch (error) {
      console.error('Error loading featured pizzas:', error)
      setDbError('Error loading featured pizzas')
    }
  }, [])

  const loadTestimonials = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        console.log("Using fallback testimonials")
        setTestimonials(getFallbackTestimonials())
        return
      }
      
      setTestimonials(data || getFallbackTestimonials())
    } catch (error) {
      console.error('Error loading testimonials:', error)
      setDbError('Error loading testimonials')
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      await Promise.all([loadFeaturedPizzas(), loadTestimonials()])
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }, [loadFeaturedPizzas, loadTestimonials])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      router.push("/login")
      return
    }
    addToCart(product)
  }

  const updateTestimonialReaction = useCallback(async (testimonialId: string, type: "like" | "dislike") => {
    try {
      setTestimonials((prev: Testimonial[]) => 
        prev.map((t: Testimonial) => 
          t.id === testimonialId 
            ? { 
                ...t, 
                likes: type === 'like' ? (t.likes || 0) + 1 : (t.likes || 0),
                dislikes: type === 'dislike' ? (t.dislikes || 0) + 1 : (t.dislikes || 0)
              } 
            : t
        )
      )
      
      const currentTestimonial = testimonials.find((t: Testimonial) => t.id === testimonialId)
      if (currentTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update({ 
            [type === 'like' ? 'likes' : 'dislikes']: 
              (currentTestimonial[type === 'like' ? 'likes' : 'dislikes' as keyof Testimonial] as number || 0) + 1 
          })
          .eq('id', testimonialId)

        if (error) throw error
      }
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }, [testimonials])

  const getFallbackTestimonials = (): Testimonial[] => {
    return [
      {
        id: "1",
        name: "María González",
        avatar_url:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "¡La mejor pizza de la ciudad! El servicio es excelente y la entrega siempre es rápida.",
        likes: 15,
        dislikes: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Carlos Rodríguez",
        avatar_url:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 4,
        comment: "Me encanta la variedad del menú. La pizza BBQ Chicken es mi favorita.",
        likes: 12,
        dislikes: 0,
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Ana Martínez",
        avatar_url:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Ingredientes frescos y sabor auténtico. Definitivamente volveré a ordenar.",
        likes: 18,
        dislikes: 2,
        created_at: new Date().toISOString(),
      },
    ]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Cargando...</div>
      </div>
    )
  }

  if (dbError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <div className="text-red-500 dark:text-red-400 text-lg font-bold mb-4">Error de Base de Datos</div>
          <div className="text-[#191011] dark:text-white mb-4">{dbError}</div>
          <div className="text-sm text-[#8b5b5d] dark:text-gray-400">
            Para configurar la base de datos, ejecuta los scripts SQL en tu proyecto Supabase.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {dbError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{dbError}</span>
        </div>
      )}
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12">
          <div 
            className="aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center flex items-center justify-center p-6 md:p-12"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            }}
          >
            <div className="max-w-4xl mx-auto text-center text-white px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Pizza Palace
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                Experimenta el sabor de la auténtica pizza italiana, elaborada con pasión y los mejores ingredientes.
                ¡Ordena ahora y saborea la diferencia!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-[#191011] bg-[#e8b4b7] hover:bg-[#d4a1a4] rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Ordenar Ahora
                </Link>
                <Link
                  href="#featured"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-white bg-transparent border-2 border-white hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                  Ver Especialidades
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Pizzas */}
        {featuredPizzas.length > 0 && (
          <div className="py-6">
            <h2 className="text-[#191011] dark:text-white text-2xl lg:text-3xl font-bold text-center mb-8">
              Nuestras Pizzas Destacadas
            </h2>
            <div className="px-2 md:px-4">
              <FeaturedPizzasCarousel 
                pizzas={featuredPizzas} 
                onAddToCart={handleAddToCart} 
              />
            </div>
          </div>
        )}

        {/* Special Offers */}
        <div id="featured" className="py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl mt-8 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#191011] dark:text-white">
            Ofertas Especiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#191011] dark:text-white mb-2">Combo Familiar</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  2 pizzas grandes, acompañamiento y bebida por precio especial. Perfecto para compartir en familia.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#e8b4b7] dark:text-[#d4a1a4]">$29.99</span>
                  <button className="bg-[#e8b4b7] hover:bg-[#d4a1a4] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Ordenar Ahora
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#191011] dark:text-white mb-2">Martes 2x1</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Compra una pizza y llévate la segunda al 50% de descuento todos los martes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#e8b4b7] dark:text-[#d4a1a4]">$24.99</span>
                  <button className="bg-[#e8b4b7] hover:bg-[#d4a1a4] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Ordenar Ahora
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#191011] dark:text-white mb-2">Especial de Almuerzo</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Pizza personal y bebida a precio especial en horario de almuerzo.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#e8b4b7] dark:text-[#d4a1a4]">$14.99</span>
                  <button className="bg-[#e8b4b7] hover:bg-[#d4a1a4] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Ordenar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#191011] dark:text-white">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${testimonial.avatar_url}")` }}
                  />
                  <div>
                    <h4 className="font-semibold text-[#191011] dark:text-white">{testimonial.name}</h4>
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(testimonial.created_at).toLocaleDateString('es-ES')}</span>
                  <div className="flex gap-4">
                    <button onClick={() => updateTestimonialReaction(testimonial.id, 'like')} className="flex items-center gap-1 hover:text-[#e8b4b7]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{testimonial.likes}</span>
                    </button>
                    <button onClick={() => updateTestimonialReaction(testimonial.id, 'dislike')} className="flex items-center gap-1 hover:text-[#e8b4b7]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m7-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                      <span>{testimonial.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#191011] dark:text-white">
            ¿Listo para ordenar?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre nuestra deliciosa selección de pizzas y disfruta de un sabor inigualable en la comodidad de tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-[#191011] bg-[#e8b4b7] hover:bg-[#d4a1a4] rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Ver Menú Completo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-transparent border-2 border-[#e8b4b7] hover:bg-[#e8b4b7]/10 rounded-full transition-colors duration-200"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
