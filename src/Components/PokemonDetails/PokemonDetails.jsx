import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){
    const [pokemon,setPokemon]=useState({})
    const {id}=useParams()
    async function downloadPokemon(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data)
        setPokemon({
            name:response.data.name,
            Image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
    }

    useEffect(()=>{
        downloadPokemon()
    },[])
    return(
        <div className="pokemon-details-wrapper">
           
            <img className="pokemon-image" src={pokemon.Image} alt="" />
            <div className="pokemon-name">Name:{pokemon.name}</div>
            <div>Weight:{pokemon.weight}</div>
            <div>Height:{pokemon.height}</div>
            <div className="pokemon-types">
                {pokemon.types&&pokemon.types.map((t)=><div className="type-content" key={t}>{t}</div>)}
            </div>
        </div>
    )
}
export default PokemonDetails;