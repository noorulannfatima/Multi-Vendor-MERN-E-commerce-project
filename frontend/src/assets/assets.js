// Category metadata. `path` must match the enum values stored on the backend
// Product model so category filtering works against the API.
export const categories = [
  { text: 'Fresh Vegetables', path: 'Vegetables', emoji: '🥬', bgColor: '#FEF6DA' },
  { text: 'Fresh Fruits', path: 'Fruits', emoji: '🍎', bgColor: '#FEE0E0' },
  { text: 'Cold Drinks', path: 'Drinks', emoji: '🥤', bgColor: '#F0F5DE' },
  { text: 'Dairy Products', path: 'Dairy', emoji: '🥛', bgColor: '#E1F5EC' },
  { text: 'Bakery & Breads', path: 'Bakery', emoji: '🍞', bgColor: '#FEE6CD' },
  { text: 'Grains & Cereals', path: 'Grains', emoji: '🌾', bgColor: '#F1E3F9' },
  { text: 'Instant Food', path: 'Instant', emoji: '🍜', bgColor: '#E0F6FE' },
]

// Used by the seller "Add Product" form — kept in sync with the model enum.
export const categoryOptions = categories.map((c) => c.path)

export const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Home', url: '/' },
      { text: 'All Products', url: '/products' },
      { text: 'My Orders', url: '/orders' },
      { text: 'Cart', url: '/cart' },
    ],
  },
  {
    title: 'Need Help?',
    links: [
      { text: 'Delivery Information', url: '#' },
      { text: 'Return & Refund Policy', url: '#' },
      { text: 'Payment Methods', url: '#' },
      { text: 'Track your Order', url: '#' },
      { text: 'Contact Us', url: '#' },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { text: 'Instagram', url: '#' },
      { text: 'Twitter', url: '#' },
      { text: 'Facebook', url: '#' },
      { text: 'YouTube', url: '#' },
    ],
  },
]
