import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  return (
    <div className="mt-12 mb-16">
      <div className="flex flex-col items-end w-max mb-6">
        <h1 className="text-2xl font-medium uppercase">All Products</h1>
        <div className="w-16 h-0.5 bg-green-600 rounded-full" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 py-10">
          {searchQuery ? `No products match "${searchQuery}".` : 'No products available yet.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllProducts
