import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SellerLayout from '../../components/seller/SellerLayout'
import { useAppContext } from '../../context/AppContext'

const PLACEHOLDER = 'https://placehold.co/48x48?text=Item'

const Order = () => {
  const { api, currency } = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/order/admin')
      if (data.success) setOrders(data.data || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const markComplete = async (orderId) => {
    try {
      const { data } = await api.put(`/order/admin/${orderId}/complete`)
      if (data.success) {
        toast.success('Order marked as delivered')
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, orderStatus: true } : o)))
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update order')
    }
  }

  return (
    <SellerLayout>
      <h1 className="text-2xl font-medium mb-6">Orders</h1>

      {loading ? (
        <p className="text-gray-400">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex flex-wrap justify-between gap-4">
                {/* Items */}
                <div className="flex-1 min-w-[200px]">
                  {order.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <img src={item.product?.image?.[0] || PLACEHOLDER} alt="" className="w-10 h-10 object-contain border border-gray-100 rounded" onError={(e) => (e.currentTarget.src = PLACEHOLDER)} />
                      <span className="text-sm">{item.product?.name || 'Product'} × {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Customer / address */}
                <div className="text-sm text-gray-600 min-w-[180px]">
                  <p className="font-medium text-gray-800">{order.firstName} {order.lastName}</p>
                  <p>{order.email}</p>
                  <p>{order.phoneNumber}</p>
                  <p className="text-gray-400">{typeof order.address === 'string' ? order.address : ''} {order.zipcode}</p>
                </div>

                {/* Meta + action */}
                <div className="text-sm text-right min-w-[140px]">
                  <p className="text-lg font-semibold text-gray-800">{currency}{order.totalPrice}</p>
                  <p className="text-gray-400">{order.method}</p>
                  {order.orderStatus ? (
                    <span className="inline-block mt-2 text-green-600">Delivered</span>
                  ) : (
                    <button onClick={() => markComplete(order._id)} className="mt-2 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition">
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SellerLayout>
  )
}

export default Order
