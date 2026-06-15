import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../config/api'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$'

  const [user, setUser] = useState(null)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  // cartItems shape: { [productId]: quantity }
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems')) || {}
    } catch {
      return {}
    }
  })

  const isSeller = user?.role === 'admin'

  // ---- Auth ----------------------------------------------------------------
  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/user/is-auth')
      if (data.success) setUser(data.data.user)
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/user/logout')
    } catch {
      // ignore network errors on logout
    }
    setUser(null)
    navigate('/')
    toast.success('Logged out')
  }

  // ---- Products ------------------------------------------------------------
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/product/')
      setProducts(data.data || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load products')
    }
  }

  // ---- Cart ----------------------------------------------------------------
  const addToCart = (itemId) => {
    const cart = { ...cartItems }
    cart[itemId] = (cart[itemId] || 0) + 1
    setCartItems(cart)
    toast.success('Added to cart')
  }

  const updateCartItem = (itemId, quantity) => {
    const cart = { ...cartItems }
    if (quantity <= 0) delete cart[itemId]
    else cart[itemId] = quantity
    setCartItems(cart)
  }

  const removeFromCart = (itemId) => {
    const cart = { ...cartItems }
    if (cart[itemId]) {
      cart[itemId] -= 1
      if (cart[itemId] <= 0) delete cart[itemId]
    }
    setCartItems(cart)
    toast.success('Removed from cart')
  }

  const clearCart = () => setCartItems({})

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)

  const getCartAmount = () => {
    let total = 0
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id)
      if (product) total += (product.offerPrice ?? product.price) * cartItems[id]
    }
    return Math.round(total * 100) / 100
  }

  useEffect(() => {
    fetchUser()
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const value = {
    api,
    navigate,
    currency,
    user,
    setUser,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    fetchUser,
    logout,
    products,
    fetchProducts,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartAmount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within an AppProvider')
  return ctx
}
