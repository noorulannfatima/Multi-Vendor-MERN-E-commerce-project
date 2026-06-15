import { useEffect, useState } from 'react'
import { FiBox, FiClipboard, FiClock, FiDollarSign } from 'react-icons/fi'
import SellerLayout from '../../components/seller/SellerLayout'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { api, products, currency } = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const { data } = await api.get('/order/admin')
        if (active && data.success) setOrders(data.data || [])
      } catch {
        // not an admin / not logged in — stats simply show zero
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const pending = orders.filter((o) => !o.orderStatus).length
  const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

  const cards = [
    { label: 'Total Products', value: products.length, icon: <FiBox />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Orders', value: orders.length, icon: <FiClipboard />, color: 'bg-green-100 text-green-600' },
    { label: 'Pending Orders', value: pending, icon: <FiClock />, color: 'bg-orange-100 text-orange-600' },
    { label: 'Revenue', value: `${currency}${Math.round(revenue * 100) / 100}`, icon: <FiDollarSign />, color: 'bg-purple-100 text-purple-600' },
  ]

  return (
    <SellerLayout>
      <h1 className="text-2xl font-medium mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${c.color}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{c.value}</p>
              <p className="text-sm text-gray-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-medium mt-10 mb-4">Recent Orders</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-400">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-gray-400">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o._id} className="border-t border-gray-100">
                  <td className="p-3">{o.firstName} {o.lastName}</td>
                  <td className="p-3">{o.products?.length}</td>
                  <td className="p-3">{currency}{o.totalPrice}</td>
                  <td className="p-3">
                    <span className={o.orderStatus ? 'text-green-600' : 'text-orange-500'}>
                      {o.orderStatus ? 'Delivered' : 'Processing'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </SellerLayout>
  )
}

export default Dashboard
