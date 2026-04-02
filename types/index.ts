export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  stock: number
  category: string
  origin: string
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  stripePaymentId?: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'customer' | 'admin'
  createdAt: Date
}
