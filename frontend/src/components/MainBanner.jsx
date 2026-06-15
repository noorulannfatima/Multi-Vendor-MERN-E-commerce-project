import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const MainBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-100 to-green-50">
      <div className="px-8 py-16 md:px-16 md:py-24 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 leading-tight">
          Freshness You Can Trust, Savings You will Love!
        </h1>
        <p className="mt-4 text-gray-600 max-w-md">
          Shop groceries from multiple local vendors and get them delivered to
          your door — fresh, fast and affordable.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Shop now
            <FiArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/products" className="flex items-center gap-2 px-7 py-3 hover:text-green-700 transition">
            Explore deals <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
