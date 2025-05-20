import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API KEY de http://www.omdbapi.com/apikey.aspx

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No se encontraron resultados');
      }
    } catch (err) {
      setError('Error al buscar películas');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Buscador de Películas</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Escribe una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <div className="results">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
