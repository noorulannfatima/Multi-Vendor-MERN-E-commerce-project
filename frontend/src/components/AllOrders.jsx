import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const PLACEHOLDER = 'https://placehold.co/80x80?text=Item'

const AllOrders = () => {
  const { api, currency, user, setShowUserLogin } = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const { data } = await api.get('/order/user')
        if (active && data.success) setOrders(data.data || [])
      } catch {
        // 401 handled by the "please log in" message below
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-4">Please log in to view your orders.</p>
        <button onClick={() => setShowUserLogin(true)} className="px-6 py-2 bg-green-600 text-white rounded-full">
          Login
        </button>
      </div>
    )
  }

  if (loading) return <p className="py-20 text-center text-gray-400">Loading orders…</p>

  if (orders.length === 0) {
    return <p className="py-20 text-center text-gray-400">You have not placed any orders yet.</p>
  }

  return (
    <div className="mt-12 mb-16">
      <h1 className="text-2xl font-medium mb-6">My Orders</h1>
      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-200 rounded-lg bg-white p-5">
            <div className="flex flex-wrap justify-between gap-3 text-sm text-gray-500 border-b border-gray-100 pb-3 mb-3">
              <span>Order ID: <span className="text-gray-700">{order._id}</span></span>
              <span>Payment: <span className="text-gray-700">{order.method}</span></span>
              <span>
                Status:{' '}
                <span className={order.orderStatus ? 'text-green-600' : 'text-orange-500'}>
                  {order.orderStatus ? 'Delivered' : 'Processing'}
                </span>
              </span>
              <span>Total: <span className="text-gray-700">{currency}{order.totalPrice}</span></span>
            </div>

            {order.products.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <img
                  src={item.product?.image?.[0] || PLACEHOLDER}
                  alt=""
                  className="w-12 h-12 object-contain border border-gray-100 rounded"
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                />
                <div className="flex-1">
                  <p className="text-gray-800">{item.product?.name || 'Product'}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllOrders
