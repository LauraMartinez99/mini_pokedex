'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-amber-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className="hover:scale-105 transition-transform duration-200 cursor-pointer">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
            <span className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full aspect-square">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`${typeColors[type.type.name]} text-white capitalize`}
            >
              {type.type.name}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
} 