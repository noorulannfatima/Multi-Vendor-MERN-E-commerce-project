import { FiShoppingCart } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

const PLACEHOLDER = 'https://placehold.co/300x300?text=No+Image'

const ProductCard = ({ product }) => {
  const { currency, addToCart, updateCartItem, cartItems, navigate } = useAppContext()
  if (!product) return null

  const inCart = cartItems[product._id] || 0
  const image = product.image?.[0] || PLACEHOLDER

  const goToProduct = () => {
    navigate(`/products/${product.category}/${product._id}`)
    scrollTo(0, 0)
  }

  return (
    <div className="border border-gray-200 rounded-md bg-white p-3 flex flex-col w-full hover:shadow-md transition">
      <div
        onClick={goToProduct}
        className="cursor-pointer flex items-center justify-center h-40 overflow-hidden"
      >
        <img
          src={image}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
          className="max-h-36 object-contain group-hover:scale-105 transition"
        />
      </div>

      <div className="mt-2 text-sm text-gray-500/70">
        <p>{product.category}</p>
        <p onClick={goToProduct} className="text-gray-800 font-medium text-base truncate cursor-pointer">
          {product.name}
        </p>
      </div>

      <div className="flex items-end justify-between mt-auto pt-3">
        <div className="text-green-600 font-medium">
          <span className="text-lg">
            {currency}
            {product.offerPrice ?? product.price}
          </span>
          {product.offerPrice && product.offerPrice < product.price && (
            <span className="text-gray-400 text-xs line-through ml-1">
              {currency}
              {product.price}
            </span>
          )}
        </div>

        {inCart === 0 ? (
          <button
            onClick={() => addToCart(product._id)}
            className="flex items-center gap-1 bg-green-100 border border-green-300 text-green-700 px-3 py-1.5 rounded text-sm hover:bg-green-200 transition"
          >
            <FiShoppingCart /> Add
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-green-100 border border-green-300 rounded px-2 py-1">
            <button onClick={() => updateCartItem(product._id, inCart - 1)} className="text-green-700 px-1 text-lg">-</button>
            <span className="w-4 text-center text-green-700">{inCart}</span>
            <button onClick={() => updateCartItem(product._id, inCart + 1)} className="text-green-700 px-1 text-lg">+</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
