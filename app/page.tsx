"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

// Types
type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  featured?: boolean
  created_at?: string
  updated_at?: string
  likes?: number
  dislikes?: number
}

type Testimonial = {
  id: string
  name: string
  comment: string
  rating: number
  avatar_url?: string
  created_at?: string
  updated_at?: string
  likes?: number
  dislikes?: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John D.',
    comment: 'The best pizza in town! Perfect crust and fresh ingredients.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    likes: 12,
    dislikes: 1
  },
  {
    id: '2',
    name: 'Sarah M.',
    comment: 'Excellent delivery service. Hot and delicious every time!',
    rating: 4,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    likes: 8,
    dislikes: 0
  },
  {
    id: '3',
    name: 'Mike R.',
    comment: 'Great value for money. The vegetarian pizza is my favorite!',
    rating: 4,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    likes: 5,
    dislikes: 2
  }
]

// Mock data for development
const mockPizzas: Product[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce and mozzarella',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'pizza',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    dislikes: 0
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Classic pizza with tomato sauce, mozzarella and pepperoni',
    price: 14.99,
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'pizza',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    dislikes: 0
  },
  {
    id: '3',
    name: 'Vegetarian',
    description: 'Pizza with fresh vegetables and mozzarella',
    price: 13.99,
    image_url: 'https://images.unsplash.com/photo-1601924638867-4a6e1db94c41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'pizza',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    dislikes: 0
  }
]

export default function HomePage() {
  const router = useRouter()
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>(testimonials)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Using the centralized Supabase client from lib/supabase/client

  // Handle adding product to cart
  const handleAddToCart = async (product: Product) => {
    try {
      setLoading(true)
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }
      
      // In a real app, you would add the item to the cart here
      console.log('Adding to cart:', product)
      alert(`${product.name} added to cart!`)
    } catch (err) {
      console.error('Error adding to cart:', err)
      setError('Failed to add item to cart. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle testimonial reaction
  const handleReaction = async (testimonialId: string, type: 'like' | 'dislike') => {
    try {
      setTestimonialList(prev =>
        prev.map(t =>
          t.id === testimonialId
            ? {
                ...t,
                likes: type === 'like' ? (t.likes || 0) + 1 : t.likes || 0,
                dislikes: type === 'dislike' ? (t.dislikes || 0) + 1 : t.dislikes || 0,
              }
            : t
        )
      )
    } catch (err) {
      console.error('Error updating reaction:', err)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#191011] dark:text-white">Loading...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12">
          <div 
            className="aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center flex items-center justify-center p-6 md:p-12"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
              backgroundPosition: 'center 30%'
            }}
          >
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Las mejores pizzas de la ciudad
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Ingredientes frescos, masa casera y el auténtico sabor italiano
              </p>
              <Link 
                href="/menu" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
              >
                Ver menú
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Pizzas */}
        <div id="featured" className="py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl mt-8 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#191011] dark:text-white">
            Nuestras Pizzas Especiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockPizzas.map((pizza) => (
              <div key={pizza.id} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={pizza.image_url} 
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{pizza.name}</h3>
                    <p className="text-red-300 font-medium">${pizza.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{pizza.description}</p>
                  <button
                    onClick={() => handleAddToCart(pizza)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Añadiendo...' : 'Añadir al carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#191011] dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialList.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <Image 
                      src={testimonial.avatar_url || '/placeholder-avatar.jpg'} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} dark:text-yellow-500`}
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
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => handleReaction(testimonial.id, 'like')}
                    className="flex items-center text-gray-500 hover:text-green-500"
                  >
                    <span className="mr-1">👍</span>
                    <span>{testimonial.likes || 0}</span>
                  </button>
                  <button 
                    onClick={() => handleReaction(testimonial.id, 'dislike')}
                    className="flex items-center text-gray-500 hover:text-red-500 ml-2"
                  >
                    <span className="mr-1">👎</span>
                    <span>{testimonial.dislikes || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#191011] dark:text-white">
            ¿Listo para ordenar?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Disfruta de nuestras deliciosas pizzas recién hechas con ingredientes frescos y de la más alta calidad.
          </p>
          <Link 
            href="/menu" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            Ver menú completo
          </Link>
        </div>
      </div>
    </div>
  )
}
