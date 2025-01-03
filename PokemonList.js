import React from 'react';
import { Link } from 'react-router-dom';

const PokemonList = ({ pokemons, toggleFavorite }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <Link to={`/pokemon/${pokemon.name}`}>
            <h2>{pokemon.name}</h2>
          </Link>
          <button onClick={() => toggleFavorite(pokemon)}>
            {pokemon.isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;