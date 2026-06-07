import './App.css'

function App() {

  return (
    <>
    <div>
      <nav className='flex items-center justify-between p-6 bg-gray-800 text-white'>
      </nav>
    </div>
    <div className='flex items-center justify-center h-50 bg-gray-100'></div>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to My E-commerce Store</h1>
        <p className='text-lg mb-8'>Discover amazing products at unbeatable prices!</p>
        <button className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300'>Shop Now</button>
      </div>
    </>
  )
}

export default App
