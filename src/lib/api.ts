import { Pokemon, PokemonListResponse } from '@/types/pokemon';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }

  return response.json();
}

export async function getPokemonDetails(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${name.toLowerCase()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details for ${name}`);
  }

  return response.json();
}

export async function getPokemonDetailsById(id: number): Promise<Pokemon> {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details for ID ${id}`);
  }

  return response.json();
} 