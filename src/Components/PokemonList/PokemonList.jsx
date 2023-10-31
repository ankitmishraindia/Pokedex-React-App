import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from 'axios';
import './PokemonList.css'

function PokemonList(){

    const [pokemonList, setPokemonList]=useState([])
    const [isloading,setIsloading]=useState(true);

    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl,setNextUrl]=useState('')
    const [prevUrl,setPrevUrl]=useState('')
    
    async function downloadPokemons(){
       
        const response=await axios.get(pokedexUrl) //it will download 20 pokemons only.
        console.log(response.data)
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
        const pokemonResults=response.data.results; //get the array of pokemons from result

        //iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url))

        //passing that promise array to axios.all
        const pokemonData=await axios.all(pokemonResultPromise) //array of 20 pokemons details data
        console.log(pokemonData)

        //iterates over every details data and extract id, name, image, types
        const res=pokemonData.map((pokeData)=>{
          const pokemon=pokeData.data;
          return {
                  id:pokemon.id,
                  name:pokemon.name,
                  image:pokeData.data.sprites.other.dream_world.front_default,
                  types:pokemon.types
                }
        })
        console.log(res)
        setPokemonList(res)
        setIsloading(false)
        
    }
   
  useEffect(()=>{
    downloadPokemons()
  },[pokedexUrl])

   
    return(
        <div className="pokemon-list-wrapper">
           <div>PokemonList</div>
           <div className="list-content">
            {(isloading)?'Loading':
           pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)
           }
           </div>
           <div className="button-wrapper">
            <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
            <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
           </div>
           
        </div>
    )
    
}
export default PokemonList;