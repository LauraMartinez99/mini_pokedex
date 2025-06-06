'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { getPokemonList, getPokemonDetails } from '@/lib/api';

export function usePokemonList(limit: number = 20) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        setLoading(true);
        const response = await getPokemonList(limit);
        
        // Fetch details for each Pokemon
        const pokemonDetails = await Promise.all(
          response.results.map(pokemon => getPokemonDetails(pokemon.name))
        );
        
        setPokemonList(pokemonDetails);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, [limit]);

  return { pokemonList, loading, error };
}

export function usePokemonDetails(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        setLoading(true);
        const data = await getPokemonDetails(name);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  return { pokemon, loading, error };
} 