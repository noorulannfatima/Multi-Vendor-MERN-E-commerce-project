import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/AppContext'

const Signin = () => {
  const { api, setUser, setShowUserLogin, navigate } = useAppContext()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/auth/user/login' : '/auth/user/register'
      const payload =
        mode === 'login'
          ? { email: form.email, password: form.password }
          : { username: form.username, email: form.email, password: form.password }

      const { data } = await api.post(endpoint, payload)
      if (data.success) {
        setUser(data.data.user)
        setShowUserLogin(false)
        toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!')
        if (data.data.user.role === 'admin') navigate(`/sellers/${data.data.user._id}/dashboard`)
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white rounded-lg p-8 shadow-xl"
      >
        <h2 className="text-2xl font-medium text-center">
          <span className="text-green-600">User</span>{' '}
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {mode === 'register' && (
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              required
              name="username"
              value={form.username}
              onChange={onChange}
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded p-2.5 mt-1 outline-none focus:border-green-500"
            />
          </div>
        )}

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            required
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded p-2.5 mt-1 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Password</label>
          <input
            required
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded p-2.5 mt-1 outline-none focus:border-green-500"
          />
        </div>

        <p className="text-sm text-gray-500">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-green-600 cursor-pointer hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

export default Signin
