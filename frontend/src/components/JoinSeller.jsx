import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiCheckCircle } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

const perks = [
  'Reach thousands of local customers',
  'Manage products & orders from one dashboard',
  'Zero setup fees — start selling today',
]

const JoinSeller = () => {
  const { api, user, isSeller, setUser, navigate } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const register = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/seller/register', form)
      if (data.success) {
        setUser(data.data.user)
        toast.success('Welcome aboard, seller! 🎉')
        navigate(`/sellers/${data.data.user._id}/dashboard`)
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-24 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        {/* Pitch */}
        <div className="flex-1">
          <p className="uppercase tracking-wide text-green-100 text-sm">Become a Vendor</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">Join GreenCart as a Seller</h2>
          <p className="mt-3 text-green-50 max-w-md">
            Grow your grocery business online. Create a free seller account and
            start listing your products in minutes.
          </p>
          <ul className="mt-5 space-y-2">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-green-50">
                <FiCheckCircle className="shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Action panel */}
        <div className="w-full md:w-80 bg-white text-gray-700 rounded-xl p-6 shadow-lg">
          {isSeller ? (
            <div className="text-center">
              <p className="font-medium mb-4">You are already a seller 🎉</p>
              <button
                onClick={() => navigate(`/sellers/${user._id}/dashboard`)}
                className="w-full py-2.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Go to Dashboard
              </button>
            </div>
          ) : !showForm ? (
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Start selling now</h3>
              <p className="text-sm text-gray-500 mb-5">It is free and takes less than a minute.</p>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-2.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Join as a Seller
              </button>
            </div>
          ) : (
            <form onSubmit={register} className="flex flex-col gap-3">
              <h3 className="text-lg font-medium text-center">Create Seller Account</h3>
              <input
                required
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="Shop / Seller name"
                className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500"
              />
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
              >
                {loading ? 'Creating…' : 'Create Account'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default JoinSeller
