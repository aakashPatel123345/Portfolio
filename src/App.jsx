import LedgerGrid from './components/LedgerGrid'
import NavRail from './components/NavRail'
import Hero from './components/sections/Hero'
import Flagship from './components/sections/Flagship'
import Work from './components/sections/Work'
import AboutContact from './components/sections/AboutContact'
import Footer from './components/sections/Footer'

 // import { Analytics } from '@vercel/analytics/next'

function App() {
  return (
    <div className="app">
      <LedgerGrid />
      <NavRail />
      <Hero />
      <Flagship />
      <Work />
      <AboutContact />
      <Footer />
    </div>
  )
}

export default App
