import { useAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

// Renders a set of related products for a given category. Designed to be
// dropped inside an existing grid (see ProductDetails), so it returns the
// cards directly without its own grid wrapper.
const Product = ({ category, excludeId, limit = 5 }) => {
  const { products } = useAppContext()

  const related = products
    .filter((p) => p.category === category && p._id !== excludeId)
    .slice(0, limit)

  if (related.length === 0) {
    return <p className="col-span-full text-gray-400 text-sm">No related products found.</p>
  }

  return (
    <>
      {related.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </>
  )
}

export default Product
