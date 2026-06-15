import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

const BestSeller = () => {
  const { products } = useAppContext()
  const featured = products.slice(0, 10)

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800">Best Sellers</h2>
        <Link to="/products" className="text-green-600 text-sm hover:underline">
          View all
        </Link>
      </div>

      {featured.length === 0 ? (
        <p className="mt-6 text-gray-400">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BestSeller
