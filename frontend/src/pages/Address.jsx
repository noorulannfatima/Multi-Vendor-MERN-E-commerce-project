import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/AppContext'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
}

const Address = () => {
  const {
    api,
    user,
    currency,
    cartItems,
    products,
    getCartAmount,
    clearCart,
    navigate,
    setShowUserLogin,
  } = useAppContext()

  const [form, setForm] = useState(initialForm)
  const [method, setMethod] = useState('COD')
  const [submitting, setSubmitting] = useState(false)

  const subtotal = getCartAmount()
  const tax = Math.round(subtotal * 0.02 * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        email: user.email || f.email,
        firstName: f.firstName || user.username || '',
      }))
    }
  }, [user])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!user) return setShowUserLogin(true)

    const ids = Object.keys(cartItems)
    if (ids.length === 0) return toast.error('Your cart is empty')

    const orderProducts = ids
      .map((id) => {
        const product = products.find((p) => p._id === id)
        if (!product) return null
        return { product: id, name: product.name, quantity: cartItems[id] }
      })
      .filter(Boolean)

    const address = `${form.street}, ${form.city}, ${form.state}, ${form.country}`

    try {
      setSubmitting(true)
      const { data } = await api.post('/order/create', {
        products: orderProducts,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address,
        zipcode: form.zipcode,
        totalPrice: total,
        method,
      })
      if (data.success) {
        toast.success('Order placed successfully!')
        clearCart()
        navigate('/orders')
      } else {
        toast.error(data.message || 'Failed to place order')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to place order')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={placeOrder} className="flex flex-col md:flex-row gap-8 mt-12 mb-16">
      {/* Shipping details */}
      <div className="flex-1">
        <h1 className="text-2xl font-medium mb-6">
          Delivery <span className="text-green-600">Address</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500 sm:col-span-2" />
          <input required name="phoneNumber" value={form.phoneNumber} onChange={onChange} placeholder="Phone number" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500 sm:col-span-2" />
          <input required name="street" value={form.street} onChange={onChange} placeholder="Street / House" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500 sm:col-span-2" />
          <input required name="city" value={form.city} onChange={onChange} placeholder="City" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          <input required name="state" value={form.state} onChange={onChange} placeholder="State" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          <input required name="country" value={form.country} onChange={onChange} placeholder="Country" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          <input required name="zipcode" value={form.zipcode} onChange={onChange} placeholder="Zip code" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
        </div>
      </div>

      {/* Payment + summary */}
      <div className="md:w-80 bg-white border border-gray-200 rounded-lg p-6 h-max">
        <h2 className="text-lg font-medium mb-4">Payment</h2>
        <div className="space-y-2 mb-4">
          {['COD', 'Online'].map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} />
              <span>{m === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</span>
            </label>
          ))}
        </div>

        <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
          <div className="flex justify-between"><span>Subtotal</span><span>{currency}{subtotal}</span></div>
          <div className="flex justify-between"><span>Tax (2%)</span><span>{currency}{tax}</span></div>
          <div className="flex justify-between font-medium text-gray-800 text-base pt-2 border-t border-gray-100">
            <span>Total</span><span>{currency}{total}</span>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="w-full mt-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60">
          {submitting ? 'Placing order…' : 'Place Order'}
        </button>
      </div>
    </form>
  )
}

export default Address
