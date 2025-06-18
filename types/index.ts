export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category?: string
  featured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  avatar_url: string
  rating: number
  comment: string
  likes: number
  dislikes: number
  created_at: string
}
