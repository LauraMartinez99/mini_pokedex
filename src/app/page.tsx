'use client';

import { usePokemonList } from '@/hooks/usePokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState, useMemo } from 'react';

export default function Home() {
  const { pokemonList, loading, error } = usePokemonList();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || pokemon.types.some(type => type.type.name === typeFilter);
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchQuery, typeFilter]);

  const uniqueTypes = useMemo(() => {
    const types = new Set<string>();
    pokemonList.forEach(pokemon => {
      pokemon.types.forEach(type => types.add(type.type.name));
    });
    return Array.from(types).sort();
  }, [pokemonList]);

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Pokédex</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <DropdownMenu
          trigger={
            <span className="capitalize">
              {typeFilter === 'all' ? 'All Types' : typeFilter}
            </span>
          }
        >
          <DropdownMenuItem onClick={() => setTypeFilter('all')}>
            All Types
          </DropdownMenuItem>
          {uniqueTypes.map(type => (
            <DropdownMenuItem
              key={type}
              onClick={() => setTypeFilter(type)}
              className="capitalize"
            >
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-square" />
          ))}
        </div>
      ) : (
        <>
          {filteredPokemon.length === 0 ? (
            <Alert>
              <AlertTitle>No Pokémon found</AlertTitle>
              <AlertDescription>
                Try adjusting your search or filter criteria.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
