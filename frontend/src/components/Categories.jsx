import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-16">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-800">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-6">
        {categories.map((cat) => (
          <div
            key={cat.path}
            onClick={() => {
              navigate(`/products/${cat.path}`)
              scrollTo(0, 0)
            }}
            className="group cursor-pointer py-5 px-3 rounded-lg flex flex-col items-center justify-center gap-2 hover:scale-105 transition"
            style={{ backgroundColor: cat.bgColor }}
          >
            <span className="text-4xl">{cat.emoji}</span>
            <p className="text-sm font-medium text-gray-700 text-center">{cat.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
