import PokemonSearch from "./PokemonSearch";
'use client';

import { useState } from 'react';

export default function PokemonSearch() {
  const [nombre, setNombre] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function buscar() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
      );

      if (!res.ok) {
        throw new Error('No encontrado');
      }

      const data = await res.json();
      setPokemon(data);
    } catch (e) {
      setError(e.message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pokemon-container">
      <h1>Buscar Pokémon</h1>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="pikachu"
      />

      <button onClick={buscar}>
        Buscar
      </button>

      {loading && <p>Cargando...</p>}

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <h3>Tipos</h3>
          <ul>
            {pokemon.types.map((t) => (
              <li key={t.type.name}>
                {t.type.name}
              </li>
            ))}
          </ul>

          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}