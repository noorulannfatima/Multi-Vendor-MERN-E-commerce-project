import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import Newletter from '../components/Newletter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <Newletter />
    </div>
  )
}

export default Home