import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const Category = () => {
  const { category } = useParams()
  const { products } = useAppContext()

  const meta = categories.find((c) => c.path.toLowerCase() === category?.toLowerCase())
  const items = products.filter(
    (p) => p.category.toLowerCase() === category?.toLowerCase()
  )

  return (
    <div className="mt-12 mb-16">
      <div className="flex flex-col items-end w-max mb-6">
        <h1 className="text-2xl font-medium uppercase">
          {meta ? meta.text : category}
        </h1>
        <div className="w-16 h-0.5 bg-green-600 rounded-full" />
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 py-10">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
