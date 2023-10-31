import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name,image,id}){
   return(
    <div className='pokemon-wrapper'>
        <Link to={`/pokemon/${id}`}>
            <div>{name}</div>
        
          <div>
            <img className="pokemon-image" src={image} />
          </div>
        </Link>
        
    </div>
   )
}
export default Pokemon;