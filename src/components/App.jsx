import StockContext from '../context/context'
import { useState } from 'react'
import HeaderComponent from './Header'
import DashboardComponent from './Dashboard'
import OutputComponent from './Output'
import FooterComponent from './Footer'
import '../assets/css/App.css'
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [stock, setStock] = useState([]);

  return (
    <StockContext.Provider value={{stock, setStock}}>
    <div className='body d-flex flex-column justify-content-between'>
        <main>
            <HeaderComponent/>
            <DashboardComponent/>
            <OutputComponent/>
        </main>
    
        <footer>
            <FooterComponent/>
        </footer>
    </div>
    </StockContext.Provider>
  )
}

export default App
