import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/AppContext'

const PLACEHOLDER = 'https://placehold.co/500x500?text=No+Image'

const SingleView = () => {
  const { id } = useParams()
  const { api, currency, addToCart, navigate, products } = useAppContext()
  const [product, setProduct] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      // Use the already-loaded list as an instant fallback, then refresh from API.
      const cached = products.find((p) => p._id === id)
      if (cached && active) setProduct(cached)
      try {
        const { data } = await api.get(`/product/public/product/${id}`)
        if (active && data.data) setProduct(data.data)
      } catch {
        if (!cached) toast.error('Failed to load product')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    setActiveImg(0)
    return () => {
      active = false
    }
  }, [id])

  if (loading && !product) {
    return <p className="py-20 text-center text-gray-400">Loading product…</p>
  }
  if (!product) {
    return <p className="py-20 text-center text-gray-400">Product not found.</p>
  }

  const images = product.image?.length ? product.image : [PLACEHOLDER]

  const buyNow = () => {
    addToCart(product._id)
    navigate('/cart')
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 mt-6">
      {/* Gallery */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(i)}
              className={`border rounded w-20 h-20 flex items-center justify-center cursor-pointer overflow-hidden ${
                activeImg === i ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <img src={img} alt="" className="object-contain max-h-full" onError={(e) => (e.currentTarget.src = PLACEHOLDER)} />
            </div>
          ))}
        </div>
        <div className="border border-gray-300 rounded max-w-md w-80 h-80 flex items-center justify-center overflow-hidden">
          <img src={images[activeImg]} alt={product.name} className="object-contain max-h-full" onError={(e) => (e.currentTarget.src = PLACEHOLDER)} />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-sm text-green-600">{product.category}</p>
        <h1 className="text-3xl font-medium mt-1">{product.name}</h1>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-3xl font-semibold text-gray-800">
            {currency}{product.offerPrice ?? product.price}
          </span>
          {product.offerPrice && product.offerPrice < product.price && (
            <span className="text-gray-400 line-through">{currency}{product.price}</span>
          )}
        </div>

        <p className="mt-6 text-gray-500 leading-relaxed max-w-xl">{product.description}</p>

        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={() => addToCart(product._id)}
            className="px-8 py-3 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={buyNow}
            className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleView
