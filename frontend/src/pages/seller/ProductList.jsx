import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiTrash2, FiUpload } from 'react-icons/fi'
import SellerLayout from '../../components/seller/SellerLayout'
import { useAppContext } from '../../context/AppContext'
import { categoryOptions } from '../../assets/assets'

const emptyForm = { name: '', description: '', category: categoryOptions[0], price: '', offerPrice: '' }
const PLACEHOLDER = 'https://placehold.co/60x60?text=Item'

const ProductList = () => {
  const { api, products, fetchProducts, currency } = useAppContext()
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onFiles = (e) => setFiles(Array.from(e.target.files).slice(0, 4))

  const addProduct = async (e) => {
    e.preventDefault()
    if (files.length === 0) return toast.error('Please add at least one image')
    if (form.description.length < 50) return toast.error('Description must be at least 50 characters')

    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('description', form.description)
    fd.append('category', form.category)
    fd.append('price', form.price)
    fd.append('offerPrice', form.offerPrice || form.price)
    files.forEach((file) => fd.append('images', file))

    try {
      setSubmitting(true)
      await api.post('/product/admin', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Product added')
      setForm(emptyForm)
      setFiles([])
      e.target.reset()
      fetchProducts()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  const removeProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/product/admin/${id}`)
      toast.success('Product deleted')
      fetchProducts()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete')
    }
  }

  return (
    <SellerLayout>
      <h1 className="text-2xl font-medium mb-6">Products</h1>

      {/* Add product form */}
      <form onSubmit={addProduct} className="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-2xl">
        <h2 className="text-lg font-medium mb-4">Add New Product</h2>

        <div className="mb-4">
          <label className="text-sm text-gray-500">Product Images (up to 4)</label>
          <label className="mt-1 flex items-center gap-2 border border-dashed border-gray-300 rounded p-3 cursor-pointer hover:bg-gray-50 w-max">
            <FiUpload /> <span className="text-sm">{files.length ? `${files.length} file(s) selected` : 'Choose images'}</span>
            <input type="file" accept="image/*" multiple hidden onChange={onFiles} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required name="name" value={form.name} onChange={onChange} placeholder="Name" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500 sm:col-span-2" />
          <textarea required name="description" value={form.description} onChange={onChange} placeholder="Description (min 50 characters)" rows={3} className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500 sm:col-span-2" />
          <select name="category" value={form.category} onChange={onChange} className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500">
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input required type="number" min="0" name="price" value={form.price} onChange={onChange} placeholder="Price" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
            <input type="number" min="0" name="offerPrice" value={form.offerPrice} onChange={onChange} placeholder="Offer price" className="border border-gray-300 rounded p-2.5 outline-none focus:border-green-500" />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="mt-5 px-6 py-2.5 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60">
          {submitting ? 'Adding…' : 'Add Product'}
        </button>
      </form>

      {/* Existing products */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {products.length === 0 ? (
          <p className="p-6 text-gray-400">No products yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3 hidden sm:table-cell">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-gray-100">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.image?.[0] || PLACEHOLDER} alt="" className="w-10 h-10 object-contain border border-gray-100 rounded" onError={(e) => (e.currentTarget.src = PLACEHOLDER)} />
                    <span className="truncate max-w-[180px]">{p.name}</span>
                  </td>
                  <td className="p-3 hidden sm:table-cell">{p.category}</td>
                  <td className="p-3">{currency}{p.offerPrice ?? p.price}</td>
                  <td className="p-3">
                    <button onClick={() => removeProduct(p._id)} className="text-red-500 hover:text-red-600" aria-label="delete">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </SellerLayout>
  )
}

export default ProductList
