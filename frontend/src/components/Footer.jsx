import { Link } from 'react-router-dom'
import { footerLinks } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="mt-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-green-50/70">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300/50">
        <div className="max-w-96">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-green-600">Green</span>
            <span className="text-2xl font-bold text-gray-800">Cart</span>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            GreenCart is a multi-vendor grocery marketplace delivering fresh
            produce, dairy, bakery and daily essentials to your doorstep.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-800 mb-3">{section.title}</h3>
              <ul className="text-sm space-y-1.5 text-gray-500">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link to={link.url} className="hover:text-green-600 transition">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GreenCart. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
