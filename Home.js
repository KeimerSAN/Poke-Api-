import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Home = ({ toggleFavorite }) => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      });
  }, [currentPage]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Pokemones</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <PokemonList pokemons={filteredPokemons} toggleFavorite={toggleFavorite} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;

// pages/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Detail = ({ toggleFavorite }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [id]);

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Volver</button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <button onClick={() => toggleFavorite(pokemon)}>
        {pokemon.isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
  );
};

export default Detail;
