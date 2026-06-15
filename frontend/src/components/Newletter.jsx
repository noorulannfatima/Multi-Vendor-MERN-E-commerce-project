import { useState } from 'react'
import { toast } from 'react-toastify'

const Newletter = () => {
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast.success('Subscribed! 🎉')
    setEmail('')
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3 mt-24 pb-14">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
        Never Miss a Deal!
      </h2>
      <p className="text-gray-500 max-w-md">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </p>
      <form onSubmit={subscribe} className="flex items-center justify-center w-full max-w-2xl mt-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Enter your email"
          className="border border-gray-300 rounded-l-md h-12 w-full px-4 outline-none"
        />
        <button
          type="submit"
          className="h-12 px-8 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newletter
