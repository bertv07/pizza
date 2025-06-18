"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Product } from "@/types"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface FeaturedPizzasCarouselProps {
  pizzas: Product[]
  onAddToCart: (product: Product) => void
}

export function FeaturedPizzasCarousel({ pizzas, onAddToCart }: FeaturedPizzasCarouselProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [, setActiveIndex] = useState(0)

  const handleAddToCart = (pizza: Product) => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      router.push("/login")
      return
    }
    onAddToCart(pizza)
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full px-4 py-2"
      >
        {pizzas.map((pizza) => (
          <SwiperSlide key={pizza.id} className="h-auto">
            <div className="flex h-full flex-col gap-4 rounded-lg bg-white dark:bg-gray-800 shadow-md overflow-hidden">
              <div
                className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover"
                style={{ backgroundImage: `url("${pizza.image_url}")` }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pizza.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                  {pizza.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-[#e8b4b7] dark:text-[#d4a1a4]">
                    ${pizza.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(pizza)}
                    className="bg-[#e8b4b7] hover:bg-[#d4a1a4] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <button 
        className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Custom Pagination */}
      <div className="swiper-pagination flex justify-center mt-4 space-x-2" />
    </div>
  )
}
