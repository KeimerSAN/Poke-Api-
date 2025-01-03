import React from 'react';
import PokemonList from '../components/PokemonList';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div>
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
        <PokemonList pokemons={favorites} toggleFavorite={toggleFavorite} />
      ) : (
        <p>No tienes pokemones favoritos.</p>
      )}
    </div>
  );
};
