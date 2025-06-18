import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          category: string
          image_url: string | null
          featured: boolean
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          category: string
          image_url?: string | null
          featured?: boolean
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          category?: string
          image_url?: string | null
          featured?: boolean
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total: number
          subtotal: number
          delivery_fee: number
          tax: number
          status: string
          delivery_address: string | null
          city: string | null
          postal_code: string | null
          phone: string | null
          special_instructions: string | null
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total: number
          subtotal: number
          delivery_fee?: number
          tax: number
          status?: string
          delivery_address?: string | null
          city?: string | null
          postal_code?: string | null
          phone?: string | null
          special_instructions?: string | null
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total?: number
          subtotal?: number
          delivery_fee?: number
          tax?: number
          status?: string
          delivery_address?: string | null
          city?: string | null
          postal_code?: string | null
          phone?: string | null
          special_instructions?: string | null
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number | null
          product_name: string
          quantity: number
          price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: number | null
          product_name: string
          quantity: number
          price: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number | null
          product_name?: string
          quantity?: number
          price?: number
          total?: number
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          rating: number | null
          comment: string
          likes: number
          dislikes: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar_url?: string | null
          rating?: number | null
          comment: string
          likes?: number
          dislikes?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          rating?: number | null
          comment?: string
          likes?: number
          dislikes?: number
          created_at?: string
        }
      }
    }
  }
}
