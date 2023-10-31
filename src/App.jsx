import Pokedex from './Components/Pokedex/Pokedex'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {
  

  return (
    <div className='outer-pokedex'>
       <Link to={'/'}>
                    <h1>
                Pokedex
             </h1>
       </Link>

      <CustomRoutes/>
   </div>
  )
}

export default App
