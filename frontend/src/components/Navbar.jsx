import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {
    user,
    setShowUserLogin,
    logout,
    isSeller,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/products')
    setOpen(false)
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white relative z-40">
      <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-1">
        <span className="text-2xl font-bold text-green-600">Green</span>
        <span className="text-2xl font-bold text-gray-800">Cart</span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center gap-6">
        <NavLink to="/" className="hover:text-green-600 transition">Home</NavLink>
        <NavLink to="/products" className="hover:text-green-600 transition">All Products</NavLink>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-44 bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <button type="submit" aria-label="search">
            <FiSearch className="text-gray-500" />
          </button>
        </form>

        <button onClick={() => navigate('/cart')} className="relative" aria-label="cart">
          <FiShoppingCart className="text-2xl text-gray-700" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 text-xs text-white bg-green-600 w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>

        {user ? (
          <div className="relative group">
            <FiUser className="text-2xl text-gray-700 cursor-pointer" />
            <ul className="hidden group-hover:block absolute top-6 right-0 bg-white shadow border border-gray-200 py-2 w-44 rounded-md text-sm z-50">
              <li className="px-4 py-1.5 text-gray-400">Hi, {user.username}</li>
              <li onClick={() => navigate('/orders')} className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer">My Orders</li>
              {isSeller && (
                <li onClick={() => navigate(`/sellers/${user._id}/dashboard`)} className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer">Seller Dashboard</li>
              )}
              <li onClick={logout} className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile toggle */}
      <div className="flex items-center gap-4 sm:hidden">
        <button onClick={() => navigate('/cart')} className="relative" aria-label="cart">
          <FiShoppingCart className="text-2xl text-gray-700" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 text-xs text-white bg-green-600 w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
        <button onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 sm:hidden z-50">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          {isSeller && (
            <span onClick={() => { navigate(`/sellers/${user._id}/dashboard`); setOpen(false) }} className="cursor-pointer">Seller Dashboard</span>
          )}
          <form onSubmit={handleSearch} className="flex items-center gap-2 border border-gray-300 px-3 rounded-full">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none"
              type="text"
              placeholder="Search products"
            />
            <FiSearch className="text-gray-500" />
          </form>
          {user ? (
            <button onClick={() => { logout(); setOpen(false) }} className="px-4 py-2 bg-green-600 text-white rounded-full">Logout</button>
          ) : (
            <button onClick={() => { setShowUserLogin(true); setOpen(false) }} className="px-4 py-2 bg-green-600 text-white rounded-full">Login</button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
