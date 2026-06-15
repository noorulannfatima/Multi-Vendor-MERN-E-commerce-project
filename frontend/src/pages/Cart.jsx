import { useMemo } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

const PLACEHOLDER = 'https://placehold.co/80x80?text=Item'

const Cart = () => {
  const {
    cartItems,
    products,
    currency,
    updateCartItem,
    getCartAmount,
    getCartCount,
    navigate,
    user,
    setShowUserLogin,
  } = useAppContext()

  // Build a detailed line-item list from the cart map + product catalogue.
  const items = useMemo(() => {
    return Object.keys(cartItems)
      .map((id) => {
        const product = products.find((p) => p._id === id)
        if (!product) return null
        return { ...product, quantity: cartItems[id] }
      })
      .filter(Boolean)
  }, [cartItems, products])

  const subtotal = getCartAmount()
  const tax = Math.round(subtotal * 0.02 * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100

  const checkout = () => {
    if (!user) return setShowUserLogin(true)
    navigate('/address')
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/products')} className="px-6 py-2 bg-green-600 text-white rounded-full">
          Continue shopping
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-12 mb-16">
      {/* Items */}
      <div className="flex-1">
        <h1 className="text-2xl font-medium mb-6">
          Shopping Cart <span className="text-green-600 text-base">{getCartCount()} items</span>
        </h1>

        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm pb-3 border-b border-gray-200">
          <span>Product</span>
          <span className="text-center">Subtotal</span>
          <span className="text-center">Action</span>
        </div>

        {items.map((item) => (
          <div key={item._id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center gap-3 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={item.image?.[0] || PLACEHOLDER}
                alt={item.name}
                className="w-16 h-16 object-contain border border-gray-100 rounded"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
              />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">{item.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => updateCartItem(item._id, item.quantity - 1)} className="px-2 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItem(item._id, item.quantity + 1)} className="px-2 border rounded">+</button>
                </div>
              </div>
            </div>
            <p className="text-center font-medium">
              {currency}{Math.round((item.offerPrice ?? item.price) * item.quantity * 100) / 100}
            </p>
            <div className="flex md:justify-center">
              <button onClick={() => updateCartItem(item._id, 0)} className="text-red-500 hover:text-red-600" aria-label="remove">
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        <button onClick={() => navigate('/products')} className="mt-6 text-green-600 hover:underline">
          ← Continue shopping
        </button>
      </div>

      {/* Summary */}
      <div className="md:w-80 bg-white border border-gray-200 rounded-lg p-6 h-max">
        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{tax}</span>
          </div>
          <div className="flex justify-between font-medium text-gray-800 text-base pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>{currency}{total}</span>
          </div>
        </div>
        <button onClick={checkout} className="w-full mt-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
