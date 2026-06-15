import { NavLink, useParams, Link } from 'react-router-dom'
import { FiGrid, FiBox, FiClipboard, FiLogOut } from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'

const SellerLayout = ({ children }) => {
  const { adminId } = useParams()
  const { user, logout } = useAppContext()

  const links = [
    { to: `/sellers/${adminId}/dashboard`, label: 'Dashboard', icon: <FiGrid /> },
    { to: `/sellers/${adminId}/product-list`, label: 'Products', icon: <FiBox /> },
    { to: `/sellers/${adminId}/orders`, label: 'Orders', icon: <FiClipboard /> },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-green-600">Green</span>
          <span className="text-xl font-bold text-gray-800">Cart</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Seller</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">Hi, {user?.username || 'Seller'}</span>
          <button onClick={logout} className="flex items-center gap-1 text-red-500 hover:text-red-600">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 md:w-60 border-r border-gray-200 bg-white">
          <nav className="flex flex-col py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 md:px-6 py-3 transition ${
                    isActive
                      ? 'border-r-4 border-green-600 bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span className="text-lg">{l.icon}</span>
                <span className="hidden md:inline">{l.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-[#F6F6F5]">{children}</main>
      </div>
    </div>
  )
}

export default SellerLayout
