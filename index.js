import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    if (favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites(favorites.filter((fav) => fav.name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home toggleFavorite={toggleFavorite} />} />
        <Route path="/pokemon/:id" element={<Detail toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
      </Routes>
    </Router>
  );
};

export default App;