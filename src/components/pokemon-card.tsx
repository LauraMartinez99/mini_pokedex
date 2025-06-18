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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Card className="hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-lg">
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
                  className="object-contain transition-transform duration-200 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 flex gap-2 flex-wrap">
              <TooltipProvider>
                {pokemon.types.map((type) => (
                  <Tooltip key={type.type.name}>
                    <TooltipTrigger asChild>
                      <Badge
                        className={`${typeColors[type.type.name]} text-white capitalize hover:opacity-80 transition-opacity`}
                      >
                        {type.type.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Type: {type.type.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span className="capitalize">{pokemon.name}</span>
              <span className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-square mb-4">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  className={`${typeColors[type.type.name]} text-white capitalize`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p>{pokemon.height / 10}m</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p>{pokemon.weight / 10}kg</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Link href={`/pokemon/${pokemon.name}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 