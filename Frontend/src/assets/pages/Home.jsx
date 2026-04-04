import Hero         from "../components/Hero";
import Ticker       from "../components/Ticker";
import FeaturedTracks from "../components/FeaturedTracks";
import TrendingChart  from "../components/TrendingChart";
import GenreGrid from '../components/GenreGrid'

import CTABanner     from "../components/CTABanner";

import "../Styles/globals.css";


const Home = () => {
  return (
    <div className="font-body min-h-screen" style={{ background: "#060608" }}>
      
      <Hero />
      <Ticker />
      <FeaturedTracks />

      {/* Side-by-side: trending chart + genre browser */}
      <div className="max-w-7xl mx-auto   grid grid-cols-1  lg:grid-cols-2 gap-5">
        <TrendingChart />
        <GenreGrid />
      </div>
      <Ticker />
      <CTABanner />
     
    </div>
  )
}

export default Home
